import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import Foo from './index';

describe('《文本》', () => {
    it('《文本》UI显示', () => {
        const msg = 'test';

        render(<Foo title={msg} />);
        expect(screen.queryByText(msg)).toBeInTheDocument();
    });
});
