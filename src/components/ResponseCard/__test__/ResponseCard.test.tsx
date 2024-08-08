import React from 'react';
import { render } from '@testing-library/react';
import ResponseCard from '../ResponseCard';

const mockedComment = {
    original: "This is mocked comment",
    tranlsation: "This is mocked comment's translation"
  }

describe ('Response card unit test', () =>{
    it('Response Card were rendered correctly', () => {
        const { getByText } = render(
            <ResponseCard title={mockedComment.original as string} text={mockedComment.tranlsation as string} />
        );
    expect(getByText(mockedComment.original)).toBeVisible();
    expect(getByText(mockedComment.tranlsation)).toBeVisible();
    });
})