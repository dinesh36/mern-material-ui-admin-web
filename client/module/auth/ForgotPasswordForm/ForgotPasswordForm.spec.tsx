import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPasswordForm from './ForgotPasswordForm';
import { sendResetPasswordEmail } from '../../services/auth-services';
import { useRouter } from 'next/router';

// Mock the external modules
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../services/auth-services', () => ({
  sendResetPasswordEmail: jest.fn(),
}));

const mockPush = jest.fn();

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (sendResetPasswordEmail as jest.Mock).mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    const { rerender } = render(<ForgotPasswordForm />);
    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Please enter your email address, You will receive a password reset link to create a new password via email.'
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('submits the form and shows the reset password notification', async () => {
    const { rerender } = render(<ForgotPasswordForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(sendResetPasswordEmail).toHaveBeenCalledWith({
        email: 'test@example.com',
      })
    );

    rerender(<ForgotPasswordForm />); // Re-render component to reflect state changes

    await waitFor(() =>
      expect(
        screen.getByText(
          'If you have an account with us, an email with instructions to reset your password will be sent to the email address you provided.'
        )
      ).toBeInTheDocument()
    );
  });

  it('navigates back to login when "BACK TO LOGIN" is clicked', async () => {
    const { rerender } = render(<ForgotPasswordForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(
        screen.getByText(
          'If you have an account with us, an email with instructions to reset your password will be sent to the email address you provided.'
        )
      ).toBeInTheDocument()
    );

    rerender(<ForgotPasswordForm />); // Re-render component to reflect state changes

    fireEvent.click(screen.getByText('BACK TO LOGIN'));
    expect(mockPush).toHaveBeenCalledWith('/signin');
  });
});
