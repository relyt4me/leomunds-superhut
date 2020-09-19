import React from 'react';
import Header from './Header';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  it('Should have the correct content when rendered with the default page title', () => {
    render(
      <MemoryRouter>
        <Header pageTitle={"Leomund's Superhut"} cart={[]} />
      </MemoryRouter>
    );

    const storefrontButton = screen.getByRole('button', { name: 'Return to Storefront' });
    const pageTitle = screen.getByRole('heading', { name: "Leomund's Superhut" });
    const cartButton = screen.getByRole('button', { name: 'My Cart Horse pulling a cart 0' });
    const horseAndCartImg = screen.getByAltText('Horse pulling a cart');

    expect(storefrontButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(cartButton).toBeInTheDocument();
    expect(horseAndCartImg).toBeInTheDocument();
  });

  it('Should have the correct content when rendered with a different title and cart', () => {
    render(
      <MemoryRouter>
        <Header pageTitle={'Weapons'} cart={[{}, {}, {}]} />
      </MemoryRouter>
    );

    const pageTitle = screen.getByRole('heading', { name: 'Weapons' });
    const cartButton = screen.getByRole('button', { name: 'My Cart Horse pulling a cart 3' });

    expect(pageTitle).toBeInTheDocument();
    expect(cartButton).toBeInTheDocument();
  });
});
