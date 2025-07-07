import ItemCard from "./ItemCard";
import { type IShoppingItem } from "./App";

export default function ShoppingList({
  shoppingList,
  removeItemFromList,
  checkItemOff,
}: {
  shoppingList: IShoppingItem[];
  removeItemFromList: (e: number) => void;
  checkItemOff: (e: number) => void;
}) {
  return (
    <section className="list">
      {shoppingList.map((item) => {
        return (
          <ItemCard
            key={item.id}
            item={item}
            removeItemFromList={removeItemFromList}
            checkItemOff={checkItemOff}
          />
        );
      })}
    </section>
  );
}
