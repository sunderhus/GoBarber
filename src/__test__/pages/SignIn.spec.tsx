import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
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

describe('SignIn Page ', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedSignIn.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to signin', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: {
        value: 'johndoe@example.com',
      },
    });

    fireEvent.change(passwordField, {
      target: {
        value: '123123',
      },
    });

    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard'),
    );
  });

  it('should not be able to login with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: {
        value: 'not-valid-email',
      },
    });

    fireEvent.change(passwordField, {
      target: {
        value: '123123',
      },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => expect(mockedHistoryPush).not.toHaveBeenCalled());
  });

  it('should display an error when login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: {
        value: 'johndoe@example.com',
      },
    });

    fireEvent.change(passwordField, {
      target: {
        value: '123123',
      },
    });

    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'alert',
        }),
      ),
    );
  });
});
