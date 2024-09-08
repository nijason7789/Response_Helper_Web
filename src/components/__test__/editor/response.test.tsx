import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { useRouter } from 'next/router';
import ResponsePage from "@/pages/editor/response";

const mockedAdivce = 'mocked advice';
const mockedTranslation = 'mocked translation';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const setupClipboardMock = (shouldFail = false) => {
    Object.defineProperty(navigator, 'clipboard', {
        value: {
            writeText: jest.fn().mockImplementation(() => {
                if (shouldFail) {
                    return Promise.reject(new Error('Failed to copy'));
                }
                return Promise.resolve(); 
            }),
        },
        configurable: true,
    });
};

const setupRouterMock = (mockPush: jest.Mock) => {
    (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
    });
};

const setupSessionStorageMock = () => {
    sessionStorage.setItem('suggestion', mockedAdivce);
    sessionStorage.setItem('translation', mockedTranslation);
};

describe('ResponsePage', () => {
    let copyButton: HTMLButtonElement;
    let backButton: HTMLButtonElement;
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        window.alert = jest.fn();
        setupRouterMock(mockPush);
        setupSessionStorageMock();
        setupClipboardMock();
        render(<ResponsePage />);
        copyButton = screen.getByRole('button', { name: 'Copy' });
        backButton = screen.getByRole('button', { name: 'Back' });
    });

    it('should render suggestion and translation', () => {
        expect(screen.getByText(mockedAdivce)).toBeInTheDocument();
        expect(screen.getByText(mockedTranslation)).toBeInTheDocument();
        expect(copyButton).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();
    });

    it('should handle back button click', () => {
        fireEvent.click(backButton);
        expect(mockPush).toHaveBeenCalledWith('/editor/main');
    });

    it('should handle copy button click', async () => {
        fireEvent.click(copyButton);
        await waitFor(() => {
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockedTranslation);
        });
    });

    it('should handle copy button click failure', async () => {
        setupClipboardMock(true);
        fireEvent.click(copyButton);
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Copy failed, please try again later');
        })
    });
});