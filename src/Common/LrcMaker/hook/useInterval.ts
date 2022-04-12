import { useEffect, useRef } from 'react';
/** eslint id-blacklist:0 */
function useInterval(callback: any, delay: any) {
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
