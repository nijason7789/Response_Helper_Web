import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MainPage from '@/pages/generator/main';
import { sendCommentRequest } from '@/services/apiService';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));
  
jest.mock('@/services/apiService', () => ({
    sendCommentRequest: jest.fn(),   
}));

describe('Generator Main page', () => {
    const mockPush = jest.fn();
    const mockSendCommentRequest = sendCommentRequest as jest.Mock;
    let btn: HTMLElement;
    let input: HTMLInputElement;
    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
          push: mockPush,
        });
        mockSendCommentRequest.mockResolvedValue({});
        render(<MainPage />);
        btn = screen.getByRole('button');
        input = screen.getByRole('textbox');
      });
    
    it('should render page correctly', () => {
        expect(screen.getByText("Please paste comment here")).toBeInTheDocument();
        expect(screen.getByText("Send")).toBeInTheDocument();
    })

    it('should send API request with input text', async() => {
        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.click(btn);
        await waitFor(() => {
            expect(mockSendCommentRequest).toHaveBeenCalledWith('test');
            expect(mockPush).toHaveBeenCalledWith('/generator/response');
          });
    })

    it('should not send API request when input field is empty', async() =>{
        fireEvent.click(btn);
        expect(mockSendCommentRequest).not.toHaveBeenCalled();
    })

})