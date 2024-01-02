import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../pages/login/Login';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { loginUserAsync } from '../redux/authSlice';

describe('Login component', () => {
  const initialState = {  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders login form with input fields and buttons', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  it('updates input fields when typing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });

  it('submits login form with valid credentials', async () => {
    const setSnackbarProps = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login setSnackbarProps={setSnackbarProps} />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'validuser' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(setSnackbarProps).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
    });
  });

  it('handles invalid login credentials', async () => {
    const setSnackbarProps = jest.fn();

    // Mock loginUserAsync to reject the login attempt
    store.dispatch.mockRejectedValueOnce();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login setSnackbarProps={setSnackbarProps} />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(setSnackbarProps).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
    });
  });

  // Additional test cases for reset, registration click, etc. can be added as needed
});
