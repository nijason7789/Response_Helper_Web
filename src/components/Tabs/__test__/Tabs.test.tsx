import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Tabs from '../Tabs';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

describe('Tabs component',() => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
          pathname: '/main',
          push: mockPush,
        });
      });
    
    afterEach(() => {
    jest.clearAllMocks();
    });

    test('renders with the correct Tab name', () => {
        render(<Tabs />);
        expect(screen.getByText('Generator')).toBeInTheDocument();
        expect(screen.getByText('Editor')).toBeInTheDocument();
        expect(screen.getByText('Translator')).toBeInTheDocument();
        expect(screen.getByText('Generator')).toHaveClass('active');
    })

    it('sets active tab and calls router.push on tab click', () => {
        render(<Tabs />);
        fireEvent.click(screen.getByText('Editor'));
        expect(screen.getByText('Editor')).toHaveClass('active');
        expect(mockPush).toHaveBeenCalledWith('/page2');

        fireEvent.click(screen.getByText('Translator'));
        expect(screen.getByText('Translator')).toHaveClass('active');
        expect(mockPush).toHaveBeenCalledWith('/page3');

        fireEvent.click(screen.getByText('Generator'));
        expect(screen.getByText('Generator')).toHaveClass('active');
        expect(mockPush).toHaveBeenCalledWith('/main');
      });

})