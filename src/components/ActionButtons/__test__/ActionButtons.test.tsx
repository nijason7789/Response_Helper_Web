import React from 'react';
import { useRouter } from 'next/router';
import { render, fireEvent } from '@testing-library/react';
import ActionButtons from '../ActionButtons';
import { sendMoreRequest } from '@/services/apiService';

jest.mock('@/services/apiService', () => ({
    sendMoreRequest: jest.fn(),
  }));

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const mockedAPIRequest = {
    originalComment: 'test',
    suggestion_1: 'suggestion1',
    suggestion_2: 'suggestion2',
    suggestion_3: 'suggestion3'
}

describe('ActionButtons', () => {
  it('More and Back buttons were rendered correctly', () => {
    const { getByText } = render(
      <ActionButtons onMoreClick={() => {}} onBackClick={() => {}} />
    );

    expect(getByText('More')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
  });

  it('Send moreAPI with valid body when clicked more btn', async () => {
    const onMoreClick = jest.fn(async () => {
      await sendMoreRequest(mockedAPIRequest);
    });
    const { getByText } = render(
      <ActionButtons onMoreClick={onMoreClick} onBackClick={() => {}} />
    );

    await fireEvent.click(getByText('More'));
    expect(sendMoreRequest).toHaveBeenCalledWith(mockedAPIRequest);
  });

  it('Page will route to main when click back button.', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    const onBackClick = () => {
        push('/main');
    };

    const { getByText } = render(
      <ActionButtons onMoreClick={() => {}} onBackClick={onBackClick} />
    );

    fireEvent.click(getByText('Back'));
    expect(push).toHaveBeenCalledWith('/main');
  });
});
