import React from 'react';

import styled from './index.module.less';

type TextTs = {
    /** 标题 */
    title: string;
};
const Text = function ({ title }: TextTs) {
    return <h1 className={styled.test}>{title}</h1>;
};

export default Text;
