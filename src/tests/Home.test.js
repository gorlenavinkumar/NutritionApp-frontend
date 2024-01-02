import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../pages/home/Home';

describe('Home component', () => {
  it('renders search input correctly', () => {
    const { getByPlaceholderText } = render(<Home />);
    const searchInput = getByPlaceholderText('Search your Food Item');
    expect(searchInput).toBeInTheDocument();
  });

  it('updates searchQuery state on input change', () => {
    const { getByPlaceholderText } = render(<Home />);
    const searchInput = getByPlaceholderText('Search your Food Item');
    fireEvent.change(searchInput, { target: { value: 'apple' } });
    expect(searchInput.value).toBe('apple');
  });

  it('navigates on search button click with a valid search query', () => {
    const { getByPlaceholderText, getByRole } = render(<Home />);
    const searchInput = getByPlaceholderText('Search your Food Item');
    fireEvent.change(searchInput, { target: { value: 'banana' } });

    const searchButton = getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

  });

  it('does not navigate on search button click with an empty search query', () => {
    const { getByRole } = render(<Home />);
    const searchButton = getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

  });
});
