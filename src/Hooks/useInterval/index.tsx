import React from 'react';

type TextTs = {
    /** 函数 */
    callback: () => void;
    /** 间隔时间 */
    delay: number | undefined;
};
const Text = function ({ callback, delay }: TextTs) {
    return <div onClick={callback}>{delay}</div>;
};

export default Text;
