import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import clsx from 'clsx';
import React from 'react';

import styled from '../index.module.less';

const list: { left: string; right: string }[] = [
    { left: '回车 Enter', right: '添加时间点' },
    { left: '向上 ↑', right: '选中上一句歌词' },
    { left: '向下 ↓', right: '选中下一句歌词' },
    { left: '空格 Space', right: '暂停歌曲' },
];

const Tip = function () {
    const text = () => (
        <div className={styled.ircTipOver}>
            {list.map((item) => (
                <div key={item.left} className={styled.ircTipTip}>
                    <div className={styled.ircTipTipLeft}>{item.left}</div>
                    <div className={styled.ircTipTipRight}>{item.right}</div>
                </div>
            ))}
        </div>
    );
    return (
        <div
            className={clsx({
                [styled.ircTip]: true,
                [styled.ircFlex]: true,
            })}
        >
            <div className={styled.ircTipText}>请播放歌曲，歌曲播放到歌词第一个字时，对选中的歌词添加时间点</div>
            <Tooltip placement="top" title={text} getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
                <InfoCircleOutlined /> <span>键盘操作指引</span>
            </Tooltip>
        </div>
    );
};

export default Tip;
