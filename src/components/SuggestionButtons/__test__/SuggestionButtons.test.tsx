import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SuggestionButtons from '../SuggestionButtons';

describe('SuggestionButtons Component', () => {
  test('renders with the correct label', () => {
    const { getByText } = render(
      <SuggestionButtons
        onSuggestionClick={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        label="Test Label"
      />
    );

    expect(getByText('Test Label')).toBeInTheDocument();
  });

  test('calls onSuggestionClick when button is clicked', () => {
    const onSuggestionClick = jest.fn();
    const { getByText } = render(
      <SuggestionButtons
        onSuggestionClick={onSuggestionClick}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        label="Click Me"
      />
    );

    fireEvent.click(getByText('Click Me'));
    expect(onSuggestionClick).toHaveBeenCalledTimes(1);
  });

  test('calls onMouseEnter when mouse enters the button', () => {
    const onMouseEnter = jest.fn();
    const { getByText } = render(
      <SuggestionButtons
        onSuggestionClick={() => {}}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => {}}
        label="Hover Me"
      />
    );

    fireEvent.mouseEnter(getByText('Hover Me'));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  test('calls onMouseLeave when mouse leaves the button', () => {
    const onMouseLeave = jest.fn();
    const { getByText } = render(
      <SuggestionButtons
        onSuggestionClick={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={onMouseLeave}
        label="Leave Me"
      />
    );

    fireEvent.mouseLeave(getByText('Leave Me'));
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
