declare const formatTime: (secs: number, hasSign?: boolean) => string;
declare const parseTime: (str: string) => number;
declare const trimViewTime: (str: string, flag?: boolean) => string;
declare const testStr: RegExp;
export { formatTime, parseTime, testStr, trimViewTime };
