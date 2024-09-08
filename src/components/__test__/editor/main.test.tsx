import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainPage from '@/pages/editor/main';
import { useRouter } from 'next/router';
import { sendAudit } from '@/services/apiService';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

jest.mock('@/services/apiService', () => ({
    sendAudit: jest.fn(),
  }));

describe('MainPage', () => {
    let sendButton:HTMLButtonElement;
    let languageSelectors:HTMLSelectElement[];
    let inputFields:HTMLInputElement[];
    const mockSendAudit = sendAudit as jest.Mock;
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
          });
        render(<MainPage />);
        window.alert = jest.fn();
        mockSendAudit.mockResolvedValue({});
        sendButton = screen.getByRole('button', { name: 'Send' });
        languageSelectors = screen.getAllByRole('combobox');
        inputFields = screen.getAllByRole('textbox');
    });

    it('should renders correctly', () => {
        expect(screen.getByText('Your native Language and reply comment')).toBeInTheDocument();
        expect(screen.getByText('Your final Language and reply comment')).toBeInTheDocument();
        for(let i = 0; i < languageSelectors.length; i++) {
            expect(languageSelectors[i]).toBeInTheDocument();
        }
        for(let i = 0; i < inputFields.length; i++) {
            expect(inputFields[i]).toBeInTheDocument();
        }
        expect(sendButton).toBeInTheDocument();
    });

    it('should handle form submission', async () => {
        fireEvent.change(languageSelectors[0], { target: { value: 'English' } });
        fireEvent.change(inputFields[0], { target: { value: 'Hello' } });
        fireEvent.change(languageSelectors[1], { target: { value: '日本語' } });
        fireEvent.change(inputFields[1], { target: { value: 'こんにちは' } });
        fireEvent.click(sendButton);
        await waitFor(() => {
            expect(mockSendAudit).toHaveBeenCalledWith({
                fromLanguage: 'English',
                nativeComment: 'Hello',
                toLanguage: '日本語',
                translatedComment: 'こんにちは'
            });
            expect(mockPush).toHaveBeenCalled();
        });
    });

    it('should handle form submission with empty input', async () => {
        fireEvent.click(sendButton);
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Input cannot be empty');
            expect(mockSendAudit).not.toHaveBeenCalled();
            expect(mockPush).not.toHaveBeenCalled();
        });
    });

    it('should handle API error', async () => {
        mockSendAudit.mockRejectedValue(new Error('API error'));
        fireEvent.change(languageSelectors[0], { target: { value: 'English' } });
        fireEvent.change(inputFields[0], { target: { value: 'Hello' } });
        fireEvent.change(languageSelectors[1], { target: { value: '日本語' } });
        fireEvent.change(inputFields[1], { target: { value: 'こんにちは' } });
        fireEvent.click(sendButton);
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Failed to send comment, please try again');
            expect(mockPush).not.toHaveBeenCalled();
        });
    });
});