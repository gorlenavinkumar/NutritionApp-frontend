import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Wishlist from '../pages/wishlist/Wishlist2';

describe('Wishlist component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch');
    localStorage.setItem('token', 'mockedToken');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.removeItem('token');
  });

  it('renders wishlist items correctly when user is logged in', async () => {
    const wishlistData = [
      { nix_item_id: 1, nix_item_name: 'Item 1' },
      { nix_item_id: 2, nix_item_name: 'Item 2' },
    ];

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => wishlistData,
    });

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  it('displays "No wishlist items found" message when wishlist is empty', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No wishlist items found.')).toBeInTheDocument();
    });
  });

  it('redirects to login page if user is not logged in', async () => {
    localStorage.removeItem('token');

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Please log in to access the wishlist.');
    });

    expect(window.location.pathname).toBe('/login');
  });

  it('handles card click and navigates to item page', async () => {
    const wishlistData = [{ nix_item_id: 1, nix_item_name: 'Test Item' }];

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => wishlistData,
    });

    const navigateMock = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigateMock,
    }));

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('Test Item'));
    });

    expect(navigateMock).toHaveBeenCalledWith('/item', { state: { item: wishlistData[0] } });
  });
});
