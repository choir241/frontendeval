// Create a shopping list application that allows a user to search for an item, add items, check them off, and delete them

// As the user starts typing, it should hit the endpoint and show a list of partial matches. Clicking an item should add it to the list.
// Entering more than two characters in the input should show a list of partially matching items (starting with the same
// characters)

// Clicking an item in the list of partially matching items should add it to the list
// Adding the same item multiple times is allowed
// Pressing the 'X' next to an item should delete it from the list
// Pressing the '✓' next to an item should check it off (i.e. strikethrough text and partially grey out text/buttons)
// Pressing the '✓' next to a checked-off item should uncheck it again

// create a search bar
// after THREE characters in the input,
// show a list of partially matching items starting with the same characters
// clicking on item in list should add it on the list
// adding same item multiple times is okay
// press x next to item to delete it in the list
// press check mark next to item should check it off - strikethrough text and
// partially grey out text/buttons
// pressing check mark should uncheck it again

// Method: GET
// URL: https://api.frontendeval.com/fake/food/:food
// Example request URL: https://api.frontendeval.com/fake/food/mi
// Example response: ['milk', 'milkshake', 'mint', 'mixed herbs']
// Notes: Only accepts items with a minimum of two characters (e.g. 'mi' is fine, 'm' will return an empty array')

// When hitting the API endpoint, be sure to debounce your input. For example, if the user very quickly presses ten letters on the keyboard, you shouldn't make 10 API requests. Instead, you should have a slight delay (~500ms) after each keypress to make sure they do not press a key again. If the delay passes without a keypress, then make a request, otherwise reset the delay.

import { useState } from "react";
import SearchFood from "./SearchFood";
import ShoppingList from "./ShoppingList";
import SearchResults from "./SearchResults";

export interface IShoppingItem {
  id: number;
  name: string;
  checked: boolean;
}

export default function App() {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<IShoppingItem[]>([]);

  function searchForFood(searchTerm: string) {
    try {
      if (searchTerm.length > 2) {
        setTimeout(async () => {
          const response = await fetch(
            `https://api.frontendeval.com/fake/food/${searchTerm}`,
          );

          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const data = await response.json();
          setSearchResults(data);
        }, 500);
      }
    } catch (err) {
      console.error(err);
      throw new Error(`${err}`);
    }
  }

  function updateShoppingCart(food: string) {
    if (shoppingList.length) {
      const latestItem = shoppingList[shoppingList.length - 1];
      setShoppingList([
        ...shoppingList,
        {
          id: latestItem.id + 1,
          name: food,
          checked: false,
        },
      ]);
    } else {
      setShoppingList([...shoppingList, { id: 0, name: food, checked: false }]);
    }
  }

  function removeItemFromList(id: number) {
    const updatedCartWithRemovedItem = shoppingList.filter(
      (item) => item.id !== id,
    );
    setShoppingList(updatedCartWithRemovedItem);
  }

  function checkOffItem(id: number) {
    const updatedCartWithItemCheckOff = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      } else {
        return item;
      }
    });
    setShoppingList(updatedCartWithItemCheckOff);
  }

  return (
    <section className="shoppingList">
      <h1>My shopping list</h1>
      <div className="shoppingListContainer">
        <SearchFood
          props={{
            searchForFood: searchForFood,
          }}
        />

        <SearchResults
          searchResults={searchResults}
          updateShoppingCart={updateShoppingCart}
        />

        <ShoppingList
          checkItemOff={checkOffItem}
          removeItemFromList={removeItemFromList}
          shoppingList={shoppingList}
        />
      </div>
    </section>
  );
}
