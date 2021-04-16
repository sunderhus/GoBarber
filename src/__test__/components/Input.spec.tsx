import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import Input from '../../components/Input';

const placeHolder = 'E-mail';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder={placeHolder} />,
    );

    expect(getByPlaceholderText(placeHolder)).toBeTruthy();
  });

  it('should be able to render highlight when input recive focus and not when blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder={placeHolder} />,
    );

    const inputElement = getByPlaceholderText(placeHolder);
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle({
        color: '#ff9000',
        borderColor: '#ff9000',
      });
    });
    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle({
        color: '#ff9000',
        borderColor: '#ff9000',
      });
    });
  });
});
