import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import IndexPage from '@/pages/index';
import { useRouter } from 'next/router';
import { sendWakeUpRequest } from '@/services/apiService';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/services/apiService', () => ({
  sendWakeUpRequest: jest.fn(),
}));

describe('IndexPage', () => {
  const mockPush = jest.fn();
  const mockSendWakeUpRequest = sendWakeUpRequest as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    
    mockSendWakeUpRequest.mockResolvedValue({});
  });

  it('should render the page correctly', () => {
    const { getByText } = render(<IndexPage />);
    expect(getByText("Welcome to Response Helper, are you ready?")).toBeInTheDocument();
    expect(getByText("YO, I'm ready")).toBeInTheDocument();
  });

  it('should call sendWakeUpRequest and navigate to /main when button is clicked', async () => {
    const { getByText } = render(<IndexPage />);
    fireEvent.click(getByText("YO, I'm ready"));

    await waitFor(() => {
      expect(mockSendWakeUpRequest).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/main');
    });
  });

  it('should handle API error gracefully', async () => {
    mockSendWakeUpRequest.mockRejectedValueOnce(new Error('API Error'));
    const { getByText } = render(<IndexPage />);
    fireEvent.click(getByText("YO, I'm ready"));

    await waitFor(() => {
      expect(mockSendWakeUpRequest).toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
