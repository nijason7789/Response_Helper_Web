import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputField from '@/components/InputField/InputField';
import { sendCommentRequest } from '@/services/apiService';

jest.mock('@/services/apiService', () => ({
    sendCommentRequest: jest.fn(),
}));

const mockedCommentAPIRequest = "test"

describe('InputField component', () => {
    test('should update value on input change', () => {
        const { getByRole } = render(<InputField onSubmit={() => {}} />);
        const input = getByRole('textbox') as HTMLInputElement;
    
        fireEvent.change(input, { target: { value: 'test' } });
    
        expect(input.value).toBe('test');
    });
  
    test.each`
        action     | expected
        ${'enter'} | ${true}
        ${'click'} | ${true}
        `(`should call onSubmit with the input value when enter or click event triggered `, (action) => {
        const handleSubmit = jest.fn(async () => {
            await sendCommentRequest(mockedCommentAPIRequest);
        });
        const { getByRole } = render(<InputField onSubmit={handleSubmit} />);
        const input = getByRole('textbox') as HTMLInputElement;
        const button = getByRole('button', { name: "Send" });
    
        fireEvent.change(input, { target: { value: 'test' } });
        if (action ==='click'){
            fireEvent.click(button);
        }
        else {
            fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        }

        expect(handleSubmit).toHaveBeenCalledWith(mockedCommentAPIRequest);
    });
  
    test('should not call onSubmit if input is empty when button is clicked', () => {
        const handleSubmit = jest.fn();
        const { getByRole } = render(<InputField onSubmit={handleSubmit} />);
        const button = getByRole('button', { name: /send/i });
    
        fireEvent.click(button);
    
        expect(handleSubmit).not.toHaveBeenCalled();
    });
  });