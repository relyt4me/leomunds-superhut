# Leomund's Superhut

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

![Leomund's Logo with a d20 dice](./src/assets/favicon.ico)

## Table of Contents

- [Overview](#overview)
- [How to use](#how-to-use)
- [Installation](#installation)
- [Functionality](#functionality)
- [Contributing](#contributing)
- [Acknowledgements and Resources](#acknowledgements-and-resources)

<!-- Brief Description -->

## Overview

Leomund's Superhut is an application built to assist Dungeon Masters in the game of Dungeons and Dragons. During players in game shopping adventures, one would normally have to flip through the many pages of the player's handbook to search for items that are requested jot down the prices of these items and then do math at the end when the players finally decide on what they want. With Leomund's Superhut that is all streamlined allowing a Dungeon Master to easily calculate shopping totals and even add cost or provide discounts.

This is a project for Turing school to utilize our knowledge on a variety of front end tools and get to display our knowledge of React applications, testing and api interactions. It was originally built in the span of a long weekend.

## How to use

* On load the application will welcome the Dungeom Master(DM) and assist with some basic instructions. 
* At the storefront a DM can browse the categories of items and add the items they find interesting. Alternatively, they can use the search function to type in the name of a known item and add it to the cart. Each item has its title and cost displayed.
* A DM can then go to their cart and view their shopping list which can be eddited or cleared at this screen.
* A DM can also use the price modify slider to give a precentage discount or add an additional tax based on the players interactions with the storekeep.

## Built With

- React 16
- CSS

## Installation

**Fork this repository:**

https://github.com/relyt4me/leomunds-superhut

**Clone your forked repository**

`git clone` and the copied URL

**Change into the directory and install the project dependencies**

`cd` into directory and run `npm install` for dependencies

### How to see the product

In terminal, go to the project directory and run 'npm start' to open the project in the browser.

## Functionality

### Adding an item to the cart by browsing categories

![User going to the storefront page selecting a category and adding an item within the category by clicking add item](/readme-assets/add-item-by-browsing.gif)

### Adding an item by searching

![Usering entering a search term, yew wand, to the search area at the storefront, displaying the item and adding it by clicking add item](/readme-assets/add-item-by-search.gif)

### Modifying the price of the items at the Cart page

![User entering the Cart page to see a list of the items they have in the cart and a displayed total value. They then slide the selector to adjust the percentage and see a resulting change in the cost](/readme-assets/modify-price.gif)

### Editing and Clearing a Cart

![User in the cart page scrolling through and removing items by clicking their remove button, They then clear the full cart with the clear button](/readme-assets/remove-items.gif)

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

See the [open issues](https://github.com/relyt4me/leomunds-superhut/issues) for a list of proposed features (and known issues).

- Fork the Project

- Create your Feature Branch (`git checkout -b feature/AmazingFeature`)

- Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

- Push to the Branch (`git push origin feature/AmazingFeature`)

- Open a Pull Request

## Authors

👤 **Tyler Haglund**

- Github: [relyt4me](https://github.com/relyt4me)
- LinkedIn: [Tyler](https://www.linkedin.com/in/tyler-haglund/)

## Acknowledgements and Resources

[Original Project Link](https://frontend.turing.io/projects/module-3/binary-challenge.html)

[Jarrett Kong](https://github.com/jarrettkong) for reviewing code and assisting in trouble with routing.

[D&D 5e API](http://www.dnd5eapi.co/) API used for the item information.

Icons for item cards and categories by [Freepik](https://www.flaticon.com/authors/freepik)

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/relyt4me/leomunds-superhut.svg?style=flat-square
[contributors-url]: https://github.com/relyt4me/leomunds-superhut/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/relyt4me/leomunds-superhut.svg?style=flat-square
[forks-url]: https://github.com/relyt4me/leomunds-superhut/network/members
[stars-shield]: https://img.shields.io/github/stars/relyt4me/leomunds-superhut.svg?style=flat-square
[stars-url]: https://github.com/relyt4me/leomunds-superhut/stargazers
[issues-shield]: https://img.shields.io/github/issues/relyt4me/leomunds-superhut.svg?style=flat-square
[issues-url]: https://github.com/relyt4me/leomunds-superhut/issues
