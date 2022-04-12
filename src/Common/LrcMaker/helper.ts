const formatTime = function (secs: number, hasSign = true) {
    if (!secs) return hasSign ? '[00:00.000]' : '00:00.000';

    let minutes: number | string = Math.floor(secs / 60) || 0;
    let seconds: number | string = secs - minutes * 60 || 0;
    seconds = seconds.toFixed(3);
    seconds = (Number(seconds) < 10 ? '0' : '') + seconds;
    minutes = (minutes < 10 ? '0' : '') + minutes;

    return hasSign ? `[${minutes}:${seconds}]` : `${minutes}:${seconds}`;
};

const parseTime = function (str: string) {
    let matches;
    // eslint-disable-next-line no-cond-assign
    if (str && (matches = str.match(/(\d{2}):(\d{2}\.\d+)/))) {
        const minutes = parseInt(matches[1], 10);
        const seconds = parseFloat(matches[2]);
        return minutes * 60 + seconds;
    }
    return 0;
};

const trimViewTime = (str: string, flag = true) => {
    const newStr = str.trim();
    if (newStr) {
        return newStr.replace(/\[|]/g, '');
    }
    return flag ? '—' : '';
};

const testStr = /\[[0-9][0-9]:[0-9][0-9].[0-9]{1,}]/; // 匹配字符串是否符合[00:00.0]

export { formatTime, parseTime, testStr, trimViewTime };
