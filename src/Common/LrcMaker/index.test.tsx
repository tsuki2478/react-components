import '@testing-library/jest-dom'; // jsdom

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { testStaticViewTime } from './components/audioPlayer';
import LrcMaker from './index';

const onCallSetInterval = (fn: any) => {
    setInterval(() => {
        fn();
    }, 1000);
};

/**  思路
 * 1：断言value类型，非string则报错。
 * 2：播放与暂停音频控制 （jsdom 模拟不了播放器, 只能通过模拟事件得到ready）
 * 3：通过testing-library选中任意一项歌词行，
 * 4：通过模拟时间点的叠加，然后模拟点击添加时间点触发事件，
 * 5：保存时根据既定数据对比模拟结果
 *
 *  通过expect进行断言
 */
describe('《歌词制作》', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    window.HTMLMediaElement.prototype.load = () => {
        Object.defineProperty(HTMLMediaElement.prototype, 'JestReady', {
            get() {
                return true;
            },
        });
    };
    window.HTMLMediaElement.prototype.play = () =>
        // 模拟播放和暂停
        new Promise(() => {
            //
        });
    window.HTMLMediaElement.prototype.pause = () =>
        // 模拟播放和暂停
        false;

    it('《歌词制作》 断言过程', async () => {
        const value = `1
2
3
4
5
6`;
        const mp3 =
            'http://greatpan-1300159541.cos.ap-nanjing.myqcloud.com/multimediaVideo/2021-11-27/1_1638002070315bf88789d094e38be129ef335cc95ac2c.mp3';
        const onClose = () => {
            console.log('close');
        };

        // 模拟推测结果
        const mockSave = () => {
            const list = [
                { time: '[00:01.000]', text: '1' },
                { time: '[00:03.000]', text: '2' },
                { time: '[00:05.000]', text: '3' },
                { time: '[00:09.000]', text: '4' },
                { time: '[00:20.000]', text: '5' },
                { time: '[00:25.000]', text: '6' },
            ];
            return list.map((item) => `${item.time}${item.text}`).join('\n');
        };

        /**
         * @param str 保存转义值
         *  断言
         *  当保存时，dom运行得到的程序数组对比模拟推测结果是否相等
         */
        const onSave = (str: string) => {
            expect(str).toBe(mockSave());
        };

        // 选中行
        let selIndex = -1;
        const getIndex = (l: number) => {
            selIndex = l;
        };

        render(<LrcMaker mp3={mp3} value={value} visible callOnClose={onClose} callOnSave={onSave} getIndex={getIndex} />);

        // 音频实例
        const play = await screen.findByTestId('audioPlay');
        fireEvent.click(play); // 点击事件

        /**
         * 《歌词行》 选中第一行,下角标就是0.
         *  断言
         *  测试键盘事件，上一行和下一行是否成立
         *  当触发下一行键盘事件时，它的key应该是 0+1 = 1，
         *  当触发上一行时，它的key应该是 1-1 = 0,
         */
        const selRef = screen.getByTestId('0');
        fireEvent.click(selRef); // 点击事件
        fireEvent.keyDown(selRef, { keyCode: 40 }); // 按键下一行
        expect(selIndex).toBe(1);
        fireEvent.keyDown(selRef, { keyCode: 38 }); // 按键上一行
        expect(selIndex).toBe(0);

        /**
         *  @param mockTime 是个乱序秒数数组，
         *  mock函数判断
         *  1：时间点的添加的各种拒绝情况，
         *   《当前选中项》时间点不允许小于距离《最近的上一行》时间
         *   《当前选中项》时间点不大于距离《最近的下一行》时间
         *    通过间隔定时器，进行一行又一行的时间点输入
         *   根据上述规则只能得到一种结果。 只要判断规定结果与实际执行结果是否相等，则可以断言对错
         */
        const mockTime = [1, 3, 5, 4, 9, 6, 20, 30, 25];
        const fn1 = jest.fn(() => {
            if ((window as any).HTMLMediaElement.prototype?.JestReady && mockTime.length > 0) {
                testStaticViewTime(mockTime[0]);
                mockTime.shift();
                // 添加时间点
                const onRef = screen.getByTestId('add');
                fireEvent.click(onRef, { screenX: 1000 }); // 点击
            }
        });

        // 检查mock函数是否被调用
        onCallSetInterval(fn1);
        // 启动定时器
        jest.advanceTimersByTime(10000); // 一定秒数
        // jest.runOnlyPendingTimers(); // 执行定时器
        expect(fn1).toBeCalled(); // 执行

        // 保存事件触发
        const saveRef = screen.getByTestId('save');
        fireEvent.click(saveRef);

        /**
         *  断言
         * testId=save 显示并且是《保 存》
         */
        expect(saveRef).toBeValid();
        expect(saveRef).toHaveTextContent('保 存');
    });
});
