import React from 'react';
import { render } from '@testing-library/react';
import ResponseCard from '../ResponseCard';

const mockedComment = {
    original: "This is mocked comment",
    translation: "This is mocked comment's translation"
  }

describe ('Response card unit test', () =>{
    it('Response Card were rendered correctly', () => {
        const { getByText } = render(
            <ResponseCard title={mockedComment.original} text={mockedComment.translation} />
        );
    expect(getByText(mockedComment.original)).toBeVisible();
    expect(getByText(mockedComment.translation)).toBeVisible();
    });
})