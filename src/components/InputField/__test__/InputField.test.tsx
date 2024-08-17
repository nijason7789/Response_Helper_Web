import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InputField from '@/components/InputField/InputField';

const mockOnValueChange = jest.fn();
const mockOnEnterPress = jest.fn();

describe('InputField component', () => {
    let inputField:HTMLInputElement
    beforeEach(()=>{
        render(<InputField onEnterPress={mockOnEnterPress} onValueChange={mockOnValueChange} value=''/>)
        inputField = screen.getByRole('textbox')
    });

    it('should render correctly', () => {
        expect(inputField).toBeInTheDocument()
    });

    it('should change value when User type something',() =>{
        fireEvent.change(inputField, { target: { value: 'test' } });
        expect(mockOnValueChange).toHaveBeenCalledWith('test');
    })

    it('should send input text while pressing Enter', ()=>{
        fireEvent.keyDown(inputField, {key:'Enter'})
        expect(mockOnEnterPress).toHaveBeenCalledTimes(1);
    })
  });