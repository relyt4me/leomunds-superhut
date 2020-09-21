import React from 'react';
import CategoriesDisplay from './CategoriesDisplay';
import { screen, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getCategories } from '../../helpers/apiCalls';
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
    const allShelfIcons = screen.getAllByAltText('Items sitting on a shelf');
    const arcaneFociCardTitle = screen.getByRole('heading', { name: 'Arcane Foci' });

    expect(adventureGearCardTitle).toBeInTheDocument();
    expect(allShelfIcons.length).toEqual(3);
    expect(arcaneFociCardTitle).toBeInTheDocument();
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
    getCategories.mockResolvedValueOnce(null);
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
