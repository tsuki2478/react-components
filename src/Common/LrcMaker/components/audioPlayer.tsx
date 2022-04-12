/* eslint-disable react/display-name */
import { useMount } from 'ahooks';
import { Slider } from 'antd';
import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { useAudioPlayer, useAudioPosition } from 'react-use-audio-player';

import { formatTime, parseTime } from '../helper';
import useInterval from '../hook/useInterval';
import pausePng from '../img/pause.png';
import playPng from '../img/play.png';
import styled from '../index.module.less';

const delay = 300;

type audioTS = {
    file: string;
    visible: boolean;
};

const changeToFixed = (n: number) => Number(n.toFixed(3));

// eslint-disable-next-line import/no-mutable-exports
export let staticViewTime = 0;

// 测试模拟时间
export const testStaticViewTime = (prop: number) => {
    staticViewTime = prop;
};
/**
 *
 *
 * @param {audioTS} { file, visible } mp3地址， modal是否Bool值
 * @param {*} ref 抛出实例给父类，让父类可以调用
 */
const UseAudioPlayer = function ({ file, visible }: audioTS, ref: Ref<any>) {
    const [viewTime, setViewTime] = useState<number>(0); // 是否启动，进入默认启动
    const { duration, seek, position } = useAudioPosition({ highRefreshRate: true });

    const { togglePlayPause, ready, loading, playing, ended } = useAudioPlayer({
        src: file,
        autoplay: false,
        loop: false,
        onend: () => {
            playing && togglePlayPause();
        },
    });

    useMount(() => {
        staticViewTime = 0; // 静态time时间
    });

    /**
     * 轮询定时， delay规定时间，每次去非响应式数据源里，拿去数据，通过对比彼此time。决定是否更新。节约性能;
     */
    useInterval(() => {
        if ((playing || changeToFixed(duration) !== viewTime) && visible) {
            if (ended) {
                if (changeToFixed(duration) !== viewTime) {
                    setViewTime(changeToFixed(duration));
                    staticViewTime = changeToFixed(duration);
                }
                return;
            }
            setViewTime(changeToFixed(position));
            staticViewTime = changeToFixed(position);
        }
    }, delay);

    useImperativeHandle(ref, () => ({
        setSeek: (timeStr: string) => {
            const num = parseTime(timeStr);
            if (num >= 0) {
                seek(Number(num));
            }
        },
        playPause: () => {
            if (!ready && !loading) return;
            togglePlayPause();
        },
        getReady: ready,
        playing,
    }));

    if (!ready && !loading) return <div>网络不畅 加载失败</div>;

    /**
     *  Slider拉动跳转时间点
     * @param time 时间
     */
    const handleChange = (time: number) => {
        seek(Number(time));
    };

    // tip 时间格式
    const viewTipFormatter = (value: any) => <span style={{ color: 'rgba(0, 0, 0, .8)' }}>{formatTime(Number(value), false)}</span>;

    return (
        <div className={styled.ircTopAudio}>
            <div className={styled.ircTopAudioLeft}>
                <div onClick={togglePlayPause} data-testid="audioPlay">
                    <img src={playing ? pausePng : playPng} alt="暂停与播放" className={styled.audioPlay} />
                </div>
            </div>
            <div className={styled.ircTopAudioLRight}>
                <div className={styled.audioTime}>
                    <span>{formatTime(viewTime, false)}</span>
                    <span>{formatTime(changeToFixed(duration), false)}</span>
                </div>
                <div className={styled.audioSlider}>
                    <Slider
                        value={viewTime}
                        max={changeToFixed(duration)}
                        min={0}
                        step={0.01}
                        onChange={handleChange}
                        tipFormatter={viewTipFormatter}
                        disabled={loading}
                        getTooltipPopupContainer={(triggerNode: any) => triggerNode.parentNode}
                        className={styled.audioSlider}
                    />
                </div>
            </div>
        </div>
    );
};
export default forwardRef(UseAudioPlayer);
