import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Register from '../pages/register/Registration';
import { registerUser } from '../redux/registerSlice';

jest.mock('../redux/registerSlice', () => ({
  registerUser: jest.fn(),
}));

describe('Register component', () => {
  it('renders without crashing', () => {
    const { getByLabelText, getByText } = render(<Register />);
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByText('SignUp')).toBeInTheDocument();
    expect(getByText('Reset')).toBeInTheDocument();
  });

  it('updates form values on input change', () => {
    const { getByLabelText } = render(<Register />);
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    expect(getByLabelText('Username')).toHaveValue('testuser');
    // Simulate changes for other fields similarly
  });

  it('handles form submission and snackbar correctly on success', async () => {
    registerUser.mockResolvedValue({ payload: { ok: true } });
    const setSnackbarProps = jest.fn();
    const { getByText } = render(<Register setSnackbarProps={setSnackbarProps} />);
    fireEvent.click(getByText('SignUp'));
    await waitFor(() => {
      expect(setSnackbarProps).toHaveBeenCalledWith({
        open: true,
        msg: 'Registered Successfully',
        severity: 'success',
      });
    });
  });

  // Test other scenarios similarly (e.g., form submission failure, reset, navigation, etc.)
});
