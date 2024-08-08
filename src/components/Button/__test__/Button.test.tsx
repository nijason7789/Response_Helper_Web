import React from 'react';
import { render } from '@testing-library/react';
import Button from '../Button';

describe ('Button unit test', () =>{
    it('Test buttons were rendered correctly', () => {
        const { getByText } = render(
          <Button onClick={() => {}}
          label='test' />
        );
    expect(getByText('test')).toBeInTheDocument();
    });
})