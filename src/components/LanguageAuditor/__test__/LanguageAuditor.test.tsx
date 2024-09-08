import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LanguageAuditor from '../LanguageAuditor';

describe('LanguageAuditor', () => {
    let onLanguageChange: jest.Mock;
    let onInputChange: jest.Mock;
    let renderResult: ReturnType<typeof render>;

    beforeEach(() => {
        onLanguageChange = jest.fn();
        onInputChange = jest.fn();
        renderResult = render(<LanguageAuditor inputValue="Hello" onLanguageChange={onLanguageChange} onInputChange={onInputChange} selectedLanguage="English" />);
    });

    it('should renders correctly', () => {
        const { container } = renderResult;
        expect(container).toBeInTheDocument();
    });

    it('should handle language change', () => {
        const { getByLabelText } = renderResult;
        fireEvent.change(getByLabelText('Select language'), { target: { value: '繁體中文' } });
        expect(onLanguageChange).toHaveBeenCalledWith('繁體中文'); 
        expect(onLanguageChange).not.toHaveBeenCalledWith('English'); 
    });

    it('should handle input change', () => {
        const { getByLabelText } = renderResult;
        fireEvent.change(getByLabelText('Input your comments'), { target: { value: 'Hello World' } });
        expect(onInputChange).toHaveBeenCalledWith('Hello World');
    });
});