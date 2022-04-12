/// <reference types="react" />
declare type MakerTS = {
    /**  设置危险按钮*/
    visible: boolean;
    /** 关闭事件 */
    callOnClose: () => void;
    /** 保存事件 */
    callOnSave: (str: string) => void;
    /** 播放源，支持：mp3 */
    mp3: string;
    /** 歌词 */
    value: string;
    /** 当前选中歌词项的下角标
     */
    getIndex?: (l: number) => void;
};
/**
 * @param mp3 url地址
 * @param value 用户输入字符
 * @visible 当前组件显示或隐藏 bool
 * @callOnClose  取消保存
 * @callOnSave  点击保存且通过检测，返回已解析string 本文
 */
declare const useLrcMaker: ({ visible, value, callOnClose, callOnSave, mp3, getIndex }: MakerTS) => JSX.Element;
export default useLrcMaker;
