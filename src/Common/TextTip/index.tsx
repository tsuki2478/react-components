import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import React, { useLayoutEffect, useRef, useState } from 'react';

import styled from './index.module.less';

interface Ref {
    current: HTMLSpanElement | any;
}

interface TextTipTS {
    /** 当超过这个最大宽度时，鼠标移动过去展示tip */
    maxWidth: number;
    /** 展示信息，也是tip展示信息 */
    message: string;
    /** 提供className 类名 */
    className?: string;
    /** 文本是否居中 */
    center?: boolean;
    /** tip展示位置 */
    placement?: TooltipPlacement;
}

/**
 *  @param message： 展示信息，也是tip展示信息
 *  @param maxWidth: 当超过这个最大宽度时，鼠标移动过去展示tip
 *  @param className :  css-module样式
 *  @param center 是否居中
 *  @param placement  tip展示位置
 */
const useTextTip = ({ maxWidth, message, className, center, placement = 'topLeft' }: TextTipTS) => {
    const [offWidth, setOffWidth] = useState<number>(0);
    const ref: Ref = useRef();

    useLayoutEffect(() => {
        setOffWidth(Number(ref?.current?.offsetWidth) || 0);
    }, [message, ref]);

    return (
        <div className={`${styled.textContent} ${className}`} style={{ width: maxWidth, textAlign: center ? 'center' : 'left' }}>
            <div className={styled.textTip} style={{ width: maxWidth }}>
                <Tooltip placement={placement} title={offWidth > maxWidth ? message : ''}>
                    <span style={{ width: 'max-content' }} ref={ref}>
                        {message}
                    </span>
                </Tooltip>
            </div>
        </div>
    );
};

export default useTextTip;
