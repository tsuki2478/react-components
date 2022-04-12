import { useEffect, useRef } from 'react';

/**
 *
 * @param callback 定时器内执行方法
 * @param delay  间隔时间
 */
function useInterval(
    /** 函数 */
    callback: () => void,
    /** 间隔时间 */
    delay: number | undefined
) {
    const savedCallback: any = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
        return () => true;
    }, [delay]);
}

export default useInterval;
