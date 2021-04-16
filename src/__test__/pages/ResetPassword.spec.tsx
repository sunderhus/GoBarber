import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ResetPassword from '../../pages/ResetPassword';

const mockedReplace = jest.fn();
const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useLocation: () => ({
      search: {
        replace: mockedReplace,
      },
    }),
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
    ToastVariations: {
      INFO: 'info',
      SUCCESS: 'success',
      ERROR: 'error',
      ALERT: 'alert',
    },
  };
});

describe('Reset password page', () => {
  it('Should be able to reset password', () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);
    const passwordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText(
      'Confirme sua nova senha',
    );
    const submitButton = getByText('Alterar Senha');

    fireEvent.change(passwordField, '123456');
    fireEvent.change(passwordConfirmationField, '123456');
    fireEvent.click(submitButton);
  });
});
