import React from 'react';
import CategoriesDisplay from './CategoriesDisplay';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getCategories, getItem } from '../../helpers/apiCalls';
import '@testing-library/jest-dom';
jest.mock('../../helpers/apiCalls');

describe('CategoriesDisplay Component', () => {
  it('Should have the correct content when rendered', async () => {
    const mockCategories = [
      {
        index: 'adventuring-gear',
        name: 'Adventuring Gear',
        url: '/api/equipment-categories/adventuring-gear',
      },
      {
        index: 'ammunition',
        name: 'Ammunition',
        url: '/api/equipment-categories/ammunition',
      },
      {
        index: 'arcane-foci',
        name: 'Arcane Foci',
        url: '/api/equipment-categories/arcane-foci',
      },
    ];
    const mockChangePageTitle = jest.fn();

    getCategories.mockResolvedValueOnce(mockCategories);
    render(
      <MemoryRouter>
        <CategoriesDisplay changePageTitle={mockChangePageTitle} />
      </MemoryRouter>
    );

    const adventureGearCardTitle = await waitFor(() => screen.getByRole('heading', { name: 'Adventuring Gear' }));
    const searchLabel = screen.getByText('Enter an item name you would find in the players handbook:');
    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: 'Find' });
    const allShelfIcons = screen.getAllByAltText('Items sitting on a shelf');
    const arcaneFociCardTitle = screen.getByRole('heading', { name: 'Arcane Foci' });

    expect(adventureGearCardTitle).toBeInTheDocument();
    expect(searchLabel).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(allShelfIcons.length).toEqual(3);
    expect(arcaneFociCardTitle).toBeInTheDocument();
  });

  it('Should show the update as the search is filled out', async () => {
    const mockChangePageTitle = jest.fn();
    getCategories.mockResolvedValueOnce([
      {
        index: 'adventuring-gear',
        name: 'Adventuring Gear',
        url: '/api/equipment-categories/adventuring-gear',
      },
    ]);

    render(
      <MemoryRouter>
        <CategoriesDisplay changePageTitle={mockChangePageTitle} />
      </MemoryRouter>
    );

    const searchInput = await waitFor(() => screen.getByRole('textbox'));

    fireEvent.change(searchInput, { target: { value: 'Arrow' } });

    expect(searchInput.value).toBe('Arrow');
  });

  it('Should show the error when a bad search is made', async () => {
    getItem.mockRejectedValue({
      error: 'Not found',
    });
    const mockChangePageTitle = jest.fn();
    getCategories.mockResolvedValueOnce([
      {
        index: 'adventuring-gear',
        name: 'Adventuring Gear',
        url: '/api/equipment-categories/adventuring-gear',
      },
    ]);

    render(
      <MemoryRouter>
        <CategoriesDisplay changePageTitle={mockChangePageTitle} />
      </MemoryRouter>
    );

    const searchInput = await waitFor(() => screen.getByRole('textbox'));
    const searchButton = screen.getByRole('button', { name: 'Find' });

    fireEvent.change(searchInput, { target: { value: 'not an item' } });
    fireEvent.click(searchButton);

    const errorMessage = await waitFor(() => screen.getByRole('heading', { name: 'We could not find that item in our stores check the spelling or try a different search' }));

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should show the the card when a correct search is made', async () => {
    const mockArrow = {
      index: 'arrow',
      name: 'Arrow',
      cost: {
        quantity: 10,
        unit: 'gp',
      },
    };
    getItem.mockResolvedValue(mockArrow);
    const mockChangePageTitle = jest.fn();
    getCategories.mockResolvedValueOnce([
      {
        index: 'adventuring-gear',
        name: 'Adventuring Gear',
        url: '/api/equipment-categories/adventuring-gear',
      },
    ]);

    render(
      <MemoryRouter>
        <CategoriesDisplay changePageTitle={mockChangePageTitle} />
      </MemoryRouter>
    );

    const searchInput = await waitFor(() => screen.getByRole('textbox'));
    const searchButton = screen.getByRole('button', { name: 'Find' });

    fireEvent.change(searchInput, { target: { value: 'Arrow' } });
    fireEvent.click(searchButton);

    const arrowCardTitle = await waitFor(() => screen.getByRole('heading', { name: 'Arrow' }));

    expect(arrowCardTitle).toBeInTheDocument();
  });

  it('Should show a Loading message until the data comes in', () => {
    const mockCategories = [
      {
        index: 'adventuring-gear',
        name: 'Adventuring Gear',
        url: '/api/equipment-categories/adventuring-gear',
      },
      {
        index: 'ammunition',
        name: 'Ammunition',
        url: '/api/equipment-categories/ammunition',
      },
      {
        index: 'arcane-foci',
        name: 'Arcane Foci',
        url: '/api/equipment-categories/arcane-foci',
      },
    ];
    const mockChangePageTitle = jest.fn();

    getCategories.mockResolvedValueOnce(mockCategories);
    render(
      <MemoryRouter>
        <CategoriesDisplay changePageTitle={mockChangePageTitle} />
      </MemoryRouter>
    );

    const loadingMessage = screen.getByRole('heading', { name: 'Loading...' });

    expect(loadingMessage).toBeInTheDocument();
  });

  it('Should call setError on a bad fetch call', async () => {
    getCategories.mockRejectedValueOnce({ error: 'fail' });
    const mockSetError = jest.fn();
    mockSetError.mockResolvedValueOnce('bingo');
    const mockChangePageTitle = jest.fn();

    render(
      <MemoryRouter>
        <CategoriesDisplay setError={mockSetError} changePageTitle={mockChangePageTitle} />
      </MemoryRouter>
    );

    await waitFor(() => expect(mockSetError).toBeCalledTimes(1));
    expect(mockSetError).toBeCalledWith('Vecna has attacked out stores!! Please come back after an adventurer cleans this up.');
  });

  it('Should call changePageTitle on load', () => {
    const mockChangePageTitle = jest.fn();
    getCategories.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <CategoriesDisplay changePageTitle={mockChangePageTitle} />
      </MemoryRouter>
    );

    expect(mockChangePageTitle).toBeCalledTimes(1);
    expect(mockChangePageTitle).toBeCalledWith("Leomund's Superhut");
  });
});
