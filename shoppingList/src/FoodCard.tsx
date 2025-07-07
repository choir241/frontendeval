export default function FoodCard({
  food,
  updateShoppingCart,
}: {
  food: string;
  updateShoppingCart: (e: string) => void;
}) {
  return (
    <button onClick={() => updateShoppingCart(food)}>
      <span>{food}</span>
    </button>
  );
}
