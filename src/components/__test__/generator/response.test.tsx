import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { useRouter } from 'next/router';
import ResponsePage from "@/pages/generator/response";
import { sendMoreRequest } from "@/services/apiService";
import mockedData from './mockedData.json';

const mockedPayload = {
    original: mockedData.original,
    translation_0: mockedData.translations['0'],
    suggestion_1: mockedData.suggestions['1'],
    translation_1: mockedData.translations['1'],
    suggestion_2: mockedData.suggestions['2'],
    translation_2: mockedData.translations['2'],
    suggestion_3: mockedData.suggestions['3'],
    translation_3: mockedData.translations['3']
}

const setupMockedSessionStorage = () => {
    sessionStorage.setItem('original', mockedData.original);
    sessionStorage.setItem('translation_0', mockedData.translations['0']);
    sessionStorage.setItem('suggestion_1', mockedData.suggestions['1']);
    sessionStorage.setItem('translation_1', mockedData.translations['1']);
    sessionStorage.setItem('suggestion_2', mockedData.suggestions['2']);
    sessionStorage.setItem('translation_2', mockedData.translations['2']);
    sessionStorage.setItem('suggestion_3', mockedData.suggestions['3']);
    sessionStorage.setItem('translation_3', mockedData.translations['3']);
};

const setupClipboardMock = (shouldFail = false) => {
    Object.defineProperty(navigator, 'clipboard', {
        value: {
            writeText: jest.fn().mockImplementation(() => {
                if (shouldFail) {
                    return Promise.reject(new Error('Failed to copy')); // 返回拒絕的 Promise
                }
                return Promise.resolve(); // 返回解析的 Promise
            }),
        },
        configurable: true,
    });
};

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

jest.mock('@/services/apiService', () => ({
    sendMoreRequest: jest.fn(),
}));

describe('Response page', () => {
    const mockPush = jest.fn();
    const mockSendMoreRequest = sendMoreRequest as jest.Mock;
    let moreButton: HTMLButtonElement;
    let backButton: HTMLButtonElement;
    let suggestionButtons: HTMLButtonElement[];
    beforeEach(() => {
        window.alert = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
          push: mockPush,
        });
        setupMockedSessionStorage();
        setupClipboardMock();
        mockSendMoreRequest.mockResolvedValue(mockedPayload);
        render(<ResponsePage />);
        moreButton = screen.getByText('More');
        backButton = screen.getByText('Back');
        suggestionButtons = screen.getAllByRole('button', { name: /suggestion/i });  
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render page correctly', () => {
        expect(screen.getByText('mocked original comment')).toBeInTheDocument();
        expect(screen.getByText('mocked translation 0')).toBeInTheDocument();
        for (let i = 1; i <= 3; i++) {
            expect(suggestionButtons[i-1]).toHaveTextContent(`mocked suggestion ${i}`);
        }
        expect(moreButton).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();
    });

    it('should handle entering and leaving suggestions events', () => {
        for (let i = 1; i <= 3; i++) {
            fireEvent.mouseEnter(suggestionButtons[i-1]);
            expect(screen.getByText(`mocked translation ${i}`)).toBeInTheDocument();
            fireEvent.mouseLeave(suggestionButtons[i-1]);
            expect(screen.getByText(`mocked suggestion ${i}`)).toBeInTheDocument();
        }
    })

    it('should handle suggestion click and copy to clipboard', async() => {
        for (let i = 1; i <= 3; i++) {
            fireEvent.click(suggestionButtons[i-1]);
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`mocked suggestion ${i}`);
            await waitFor(() => {
                expect(window.alert).toHaveBeenCalledWith(`mocked suggestion ${i}\nis copied to clipboard`);
            })
        }
    })

    it('should handle suggestion button click but fail to copy to clipboard', async() => {
        setupClipboardMock(true); //Simulate the clipboard API failure
        fireEvent.click(suggestionButtons[0]);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('mocked suggestion 1');
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Failed to copy text, please try again later');
        })
    })

    it('should handle back click', () => {
        fireEvent.click(backButton);
        expect(mockPush).toHaveBeenCalledWith('/generator/main');
    })

    it('should handle more click', async () => {
        await act(async () =>{
            fireEvent.click(moreButton);
            expect(mockSendMoreRequest).toHaveBeenCalled();
        })
    })


    it('should handle API error gracefully', async () => {
        mockSendMoreRequest.mockRejectedValueOnce(new Error('API Error'));
        await waitFor(() =>{
            fireEvent.click(moreButton);
            expect(mockSendMoreRequest).toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalled();
        })
    })
})
