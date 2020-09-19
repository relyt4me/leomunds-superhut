export const getCategories = () => {
  return fetch(`https://www.dnd5eapi.co/api/equipment-categories/`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((categories) => categories.results);
};

export const getItemsInCategory = (categoryId) => {
  return fetch(`https://www.dnd5eapi.co/api/equipment-categories/${categoryId}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((category) => category.equipment);
};
