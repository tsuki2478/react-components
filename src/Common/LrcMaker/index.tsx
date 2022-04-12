import { useMount, useUpdateLayoutEffect } from 'ahooks';
import { Button, message } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { AudioPlayerProvider } from 'react-use-audio-player';

import AudioPlayer, { staticViewTime } from './components/audioPlayer';
import LrcHeader from './components/header';
import LrcList from './components/list';
import Tip from './components/tip';
import { formatTime, parseTime, testStr, trimViewTime } from './helper';
import styled from './index.module.less';

interface IrcTs {
    time?: string;
    text: string;
}
type MakerTS = {
    /**  设置危险按钮*/
    visible: boolean;
    /** 关闭事件 */
    callOnClose: () => void;
    /** 保存事件 */
    callOnSave: (str: string) => void;
    /** 播放源，支持：mp3 */
    mp3: string;
    /** 歌词 */
    value: string;
    /** 当前选中歌词项的下角标
     */
    getIndex?: (l: number) => void;
};

function listReducer(draft: IrcTs[] | [], action: { type: string; payload: any }) {
    switch (action.type) {
        case 'single':
            // eslint-disable-next-line no-case-declarations
            const list: IrcTs[] = [];
            draft.map((item, index: number) => {
                if (action.payload.index === index) {
                    item.time = action.payload.timeStr;
                }
                list.push(item);
                return list;
            });
            return list;
        case 'all':
            return action.payload;
        case 'clean':
            return [];
        default:
            return action.payload;
    }
}

/**
 * @param mp3 url地址
 * @param value 用户输入字符
 * @visible 当前组件显示或隐藏 bool
 * @callOnClose  取消保存
 * @callOnSave  点击保存且通过检测，返回已解析string 本文
 */
const useLrcMaker = ({ visible, value, callOnClose, callOnSave, mp3, getIndex }: MakerTS) => {
    const [selectIndex, setSelectIndex] = useState(0); // 当前选中项
    const [flagNext, setFlagNext] = useState(true); // 允许进行下一次操作
    const [list, dispatchList] = useReducer(listReducer, []); // 歌词组件所需格式

    const audioRef = useRef<any>(null);

    const indexRef = useRef(selectIndex);

    const listRef = useRef(list);

    /**
     *
     * @param items 转义后的value
     * @param flag 是否返回解析数组
     * @returns
     */
    const onSetListAll = (items: string[]) => {
        const tempList: IrcTs[] = [];
        items.map((item) => {
            const obj: IrcTs = {
                time: '',
                text: '',
            };
            if (item.match(testStr)) {
                const itemTime: string = (item.match(testStr) || [])[0];
                const itemText: string = item.replace(itemTime, '');
                obj.time = itemTime;
                obj.text = itemText;
            } else {
                obj.text = item;
            }
            tempList.push(obj);
            return item;
        });
        dispatchList({
            type: 'all',
            payload: tempList,
        });
    };

    // 修改单一List数组下角标时间点
    const onSetList = (time: number, i: number) => {
        dispatchList({
            type: 'single',
            payload: { timeStr: formatTime(time), index: i },
        });
    };

    useMount(() => {
        setSelectIndex(0);
        try {
            const items: string[] = value.split('\n');
            onSetListAll(items);
        } catch (error) {
            throw new Error('value参数类型错误');
        }
    });

    /**  添加时间点   */
    const addTag = () => {
        const index = indexRef?.current || selectIndex;
        const curList = listRef?.current || list;
        if (index < 0) {
            message.warning('请播放歌曲，歌曲播放到歌词第一个字时，对选中的歌词添加时间点');
            return;
        }
        const time = staticViewTime;
        const prevIndex = index - 1;
        if (prevIndex > 0) {
            let copy_list = JSON.parse(JSON.stringify(curList));
            copy_list = copy_list.slice(0, index);
            const diff_list: IrcTs[] = [];
            copy_list.map((n: IrcTs) => {
                if (n.time) {
                    diff_list.push(n);
                }
                return n;
            });
            if (diff_list.length > 0 && diff_list[diff_list.length - 1]?.time && time < parseTime(diff_list[diff_list.length - 1].time || '')) {
                message.error('不可小于前面歌词已添加的时间点');
                return;
            }
        }
        const nextIndex = index + 1;
        if (curList.length - 1 >= nextIndex) {
            let copy_list = JSON.parse(JSON.stringify(curList));
            copy_list = copy_list.slice(nextIndex, copy_list.length);
            const diff_list: IrcTs[] = [];
            copy_list.map((n: IrcTs) => {
                if (n.time) {
                    diff_list.push(n);
                }
                return n;
            });
            if (diff_list.length > 0 && diff_list[0]?.time && time > parseTime(diff_list[0].time || '')) {
                message.error('不可大于后面歌词已添加的时间点');
                return;
            }
        }
        if (audioRef?.current?.getReady || (window as any).HTMLMediaElement.prototype?.JestReady) {
            setFlagNext(false);
            onSetList(time, index);
        } else {
            message.loading('歌曲加载中...请稍后重试');
        }
    };

    /**
     * @param item 选中歌词 内容与时间
     * @param i  数组的下角标
     */
    const selectItem = (item: IrcTs, i: number) => {
        setSelectIndex(i);
        if (!item.time || trimViewTime(item.time || '', false) === '') return;
        if (audioRef?.current?.setSeek) {
            audioRef?.current?.setSeek(item.time);
        }
    };

    // 键盘按键
    const onKey = (e: KeyboardEvent) => {
        const index = indexRef?.current;
        const len = listRef.current.length;
        switch (e.keyCode) {
            case 13:
                addTag();
                return;
            case 32:
                if (audioRef?.current?.playPause) {
                    audioRef?.current?.playPause();
                }
                return;
            case 38:
                if (index === 0) return;
                setSelectIndex(index - 1);
                return;
            case 40:
                if (index + 1 > len - 1) return;
                setSelectIndex(index + 1);
                break;
            default:
                break;
        }
    };
    // 监听键盘空格
    useEffect(() => {
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 永远获取selectIndex最新值，避免闭包
    useEffect(() => {
        indexRef.current = selectIndex;
        getIndex && getIndex(selectIndex);
    }, [getIndex, selectIndex]);

    // 第一次不执行，之后当数组变化时，就是用户操作change
    useUpdateLayoutEffect(() => {
        setFlagNext(true);
        listRef.current = list;
    }, [list]);

    // 当flagNext 变化时，index + 1
    useUpdateLayoutEffect(() => {
        if (flagNext && selectIndex + 1 <= list.length - 1) {
            setSelectIndex(selectIndex + 1);
        }
    }, [flagNext]);

    // 检测是否允许保存
    const save = () => {
        let flag = true; // 是否允许保存
        list.some((item: { time: string }) => {
            if (!item.time || item.time === '') {
                flag = false;
                return true;
            }
            return false;
        });
        if (!flag) {
            message.error('当前尚有歌词未加时间点，请完善歌词信息');
            return;
        }
        if (audioRef?.current?.playing) {
            audioRef?.current?.playPause();
        }
        let str = '';
        str = list.map((item: IrcTs) => `${item.time}${item.text}`).join('\n');
        callOnSave(str);
    };

    // 关闭
    const onClose = () => {
        console.log('------------');
        if (audioRef?.current?.playing) {
            audioRef?.current?.playPause();
        }
        callOnClose();
    };

    return (
        <div className={styled.irc}>
            <LrcHeader callOnClose={onClose} />
            <Tip />
            <div className={styled.ircTop}>
                <AudioPlayerProvider>
                    <AudioPlayer file={mp3} visible={visible} ref={audioRef} />
                </AudioPlayerProvider>
            </div>
            <div className={styled.ircMain}>
                <div className={styled.ircMainTop}>
                    <Button
                        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                            e.preventDefault();
                            if (e.screenX === 0 && e.clientX === 0) return;
                            addTag();
                        }}
                        className={`${styled.addTag} ${styled.redBtn}`}
                        data-testid="add"
                    >
                        添加时间点
                    </Button>
                </div>
                <LrcList onCallSelectItem={selectItem} selectIndex={selectIndex} list={list} />
            </div>
            <div className={styled.ircFooter}>
                <Button
                    shape="round"
                    className={clsx({
                        [styled.ircFooterRight]: true,
                        [styled.ircFooterBtn]: true,
                    })}
                    onClick={save}
                    data-testid="save"
                >
                    保存
                </Button>
            </div>
        </div>
    );
};

export default useLrcMaker;
