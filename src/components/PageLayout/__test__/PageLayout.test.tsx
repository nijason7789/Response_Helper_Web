import React from 'react';
import { render } from '@testing-library/react';
import PageLayout from '../PageLayout';

describe('PageLayout Component', () => {
  test('renders children correctly', () => {
    const { getByText } = render(
      <PageLayout>
        <div>Test Child</div>
      </PageLayout>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  test('applies the correct container class', () => {
    const { container } = render(
      <PageLayout>
        <div>Test Child</div>
      </PageLayout>
    );
    expect(container.firstChild).toHaveClass('container');
  });
});
