---
nav:
    title: 定时器
    path: /components
---

## useInterval

```tsx
import { Button } from 'antd';
import React, { useState } from 'react';
import { useInterval } from 'tsuki-react-components';

function intervalMode() {
    const [value, setValue] = useState(0);
    const [isRunning, toggleIsRunning] = useState(false);

    useInterval(
        () => {
            setValue((l) => l + 1);
        },
        isRunning ? 1000 : null
    );

    return  <Button onClick={()=>{toggleIsRunning(!isRunning)}}>{isRunning ? '关闭':'开启'}定时器-->{value}秒</Button>;
}

export default intervalMode;
```

<API></API>
