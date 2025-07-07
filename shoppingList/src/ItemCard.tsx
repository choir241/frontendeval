import type { IShoppingItem } from "./App";
import {
  IoIosCheckmarkCircleOutline,
  IoMdCheckmark,
  IoIosClose,
} from "react-icons/io";

export default function ItemCard({
  item,
  removeItemFromList,
  checkItemOff,
}: {
  item: IShoppingItem;
  removeItemFromList: (e: number) => void;
  checkItemOff: (e: number) => void;
}) {
  return (
    <div key={item.id} className={`${item.checked ? "checked" : ""} item`}>
      {item.checked ? (
        <button>
          <IoMdCheckmark onClick={() => checkItemOff(item.id)} />
        </button>
      ) : (
        <button onClick={() => checkItemOff(item.id)}>
          <IoIosCheckmarkCircleOutline onClick={() => checkItemOff(item.id)} />
        </button>
      )}
      <span>{item.name}</span>
      <button onClick={() => removeItemFromList(item.id)}>
        <IoIosClose />
      </button>
    </div>
  );
}
