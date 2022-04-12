---
nav:
    title: 歌词制作
    path: /components
---

## Lrc

歌词制作功能， 通过传入字符文本， 进行歌词时间点编辑， 完成后，返回字符串

代码演示

```tsx
import { Button, Card, message, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { LrcMaker } from 'syqm-react-components';

import './md.less';

interface IrcTs {
    time?: string;
    text: string;
}

const mp3 = 'http://greatpan-1300159541.cos.ap-nanjing.myqcloud.com/multimediaVideo/2021-11-27/1_1638002070315bf88789d094e38be129ef335cc95ac2c.mp3';

function LrcMode() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = useState(''); // 用户输入

    //  打开模态框
    const onPenModal = () => {
        if (value.trim().length > 0) {
            setIsModalVisible(true);
            return;
        }
        message.info('请先录入歌词');
    };

    // 取消保存，或者X， 清空并关闭模态框
    const onClose = () => {
        setIsModalVisible(false);
    };

    // 将保存内容覆盖到 歌词制作里
    const onSave = (str: string) => {
        setValue(str);
        onClose();
    };

    const onChange = (e: { target: { value: any } }) => {
        setValue(e.target.value);
    };

    return (
        <Card>
            <TextArea
                value={value}
                onChange={onChange}
                placeholder="请按一段一句录入歌词10000字以内"
                autoSize={{ minRows: 5, maxRows: 8 }}
                style={{
                    width: '100%',
                }}
            />
            <Button onClick={onPenModal} style={{ margin: '20px' }}>
                打开歌词制作
            </Button>

            <Modal destroyOnClose closable={false} visible={isModalVisible} footer={null} width="720px" className="lrcModal" centered>
                <LrcMaker mp3={mp3} value={value} visible={isModalVisible} callOnClose={onClose} callOnSave={onSave} />
            </Modal>
        </Card>
    );
}

export default LrcMode;
```

<API></API>

<!-- More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo -->
