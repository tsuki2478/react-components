import { useUpdateLayoutEffect } from 'ahooks';
import clsx from 'clsx';
import React from 'react';

import { trimViewTime } from '../helper';
import styled from '../index.module.less';

interface IrcTs {
    time?: string;
    text: string;
}
type listTS = {
    onCallSelectItem: (item: IrcTs, i: number) => void;
    selectIndex: number;
    list: IrcTs[];
};

const LrcList = function ({ onCallSelectItem, selectIndex, list }: listTS) {
    // const ref = useRef(null);
    // const scroll = useScroll(ref);

    useUpdateLayoutEffect(() => {
        const countHeight = list.length * 40 > 504 ? list.length * 40 : 504; // 总高度
        // const nowHeight = (scroll?.top || 0) + 504; // 当前可见高度 scroll?.top-nowHeight
        const selHeight = (selectIndex + 1) * 40; // 选中高度
        if (countHeight === 504) return; // （占满）
        // console.log(countHeight);
        // console.log(nowHeight);
        // console.log(selHeight);
        const dom = document.getElementById('lrcList');
        dom?.scrollTo(0, selHeight + 200 - 504);
    }, [selectIndex]);

    return (
        <ul className={styled.ircMainContent} id="lrcList">
            {list.length > 0 &&
                list.map((item: IrcTs, index: number) => (
                    <li
                        className={clsx({
                            [styled.ircMainContentLi]: true,
                            [styled.selected]: selectIndex === index,
                        })}
                        onClick={() => {
                            onCallSelectItem(item, index);
                        }}
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={String(index)}
                        data-testid={String(index)}
                    >
                        <div className={styled.ircMainContentLiTime}>{trimViewTime(item.time || '')}</div>
                        <div className={styled.ircMainContentLiText}>{item.text}</div>
                    </li>
                ))}
        </ul>
    );
};

export default LrcList;
