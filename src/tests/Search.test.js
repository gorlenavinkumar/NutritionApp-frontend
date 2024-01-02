import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import TableComponent from '../pages/search/SearchResults';

// Mocking localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: key => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: key => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('TableComponent', () => {
  // Rendering Test Cases
  test('renders without crashing', () => {
    render(<TableComponent />);
  });

  test('renders select dropdown', () => {
    render(<TableComponent />);
    const selectElement = screen.getByRole('combobox', { name: /select your food item/i });
    expect(selectElement).toBeInTheDocument();
  });

  // Selection Test Cases
  test('selects a food item from dropdown', () => {
    render(<TableComponent />);
    const selectElement = screen.getByRole('combobox', { name: /select your food item/i });
    fireEvent.change(selectElement, { target: { value: 'Hamburger' } });
    expect(selectElement.value).toBe('Hamburger');
  });

  test('displays selected food item data in the table', async () => {
    render(<TableComponent />);
    const selectElement = screen.getByRole('combobox', { name: /select your food item/i });
    fireEvent.change(selectElement, { target: { value: 'Hamburger' } });

    // Mock the data to be returned for the selected item
    const mockSelectedData = {
      nix_item_name: 'Hamburger',
      nf_calories: 340,
      nf_total_fat: 12,
      // ... other properties
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([mockSelectedData]),
    });

    // Check if the table displays the selected item's data
    const addToFavoritesButton = screen.getByRole('button', { name: /add to favorites/i });
    fireEvent.click(addToFavoritesButton);

    await waitFor(() => {
      expect(screen.getByText(/selected item: hamburger/i)).toBeInTheDocument();
      expect(screen.getByText(/nf_calories/i)).toBeInTheDocument();
      expect(screen.getByText(/340/i)).toBeInTheDocument();
      // ... assert other properties
    });
  });

  // API Interaction Test Cases - Mocking fetch calls
  const mockData = [
    {
      nix_item_name: 'Hamburger',
      // ... mock other properties
    },
    // ... add more mock data as needed
  ];

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
      ok: true,
    })
  );

  test('adds item to favorites on addToFavorites call', async () => {
    render(<TableComponent />);
    const selectElement = screen.getByRole('combobox', { name: /select your food item/i });
    fireEvent.change(selectElement, { target: { value: 'Hamburger' } });

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    const addToFavoritesButton = screen.getByRole('button', { name: /add to favorites/i });
    fireEvent.click(addToFavoritesButton);

    await waitFor(() => {
      expect(screen.getByText(/delete from favorites/i)).toBeInTheDocument();
    });
  });
});
