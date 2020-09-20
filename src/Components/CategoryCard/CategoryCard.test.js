import React from 'react';
import CategoryCard from './CategoryCard';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('CategoryCard Component', () => {
  it('Should have the correct content when rendered', () => {
    render(
      <MemoryRouter>
        <CategoryCard name='Good Gear' />
      </MemoryRouter>
    );

    const CategoryCardTitle = screen.getByRole('heading', { name: 'Good Gear' });
    const shelfIcon = screen.getByAltText('Items sitting on a shelf');

    expect(CategoryCardTitle).toBeInTheDocument();
    expect(shelfIcon).toBeInTheDocument();
  });
});
