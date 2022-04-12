import { CloseOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import clsx from 'clsx';
import React from 'react';

import styled from '../index.module.less';

const LrcHeader = function ({ callOnClose }: { callOnClose: () => void }) {
    return (
        <div
            className={clsx({
                [styled.ircHeader]: true,
                [styled.ircFlex]: true,
            })}
        >
            <h1>滚动歌词制作</h1>
            <Popconfirm
                placement="bottomRight"
                title="关闭后不会自动保存，确认关闭吗？"
                onConfirm={callOnClose}
                okType="danger"
                okButtonProps={{
                    shape: 'round',
                    size: 'middle',
                    type: 'primary',
                }}
                cancelButtonProps={{
                    shape: 'round',
                    size: 'middle',
                }}
                okText="关闭"
                cancelText="取消"
            >
                <div className={styled.onCloseIcon}>
                    <CloseOutlined className={styled.oncloseIcon} />
                </div>
            </Popconfirm>
        </div>
    );
};

export default LrcHeader;
