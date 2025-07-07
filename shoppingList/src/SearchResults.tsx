import FoodCard from "./FoodCard";

export default function SearchResults({
  searchResults,
  updateShoppingCart,
}: {
  searchResults: string[];
  updateShoppingCart: (e: string) => void;
}) {
  return (
    <section
      className={`${searchResults.length ? "searchResultsContainer" : ""}`}
    >
      {searchResults.map((food: string, index: number) => {
        return (
          <FoodCard
            food={food}
            key={index}
            updateShoppingCart={updateShoppingCart}
          />
        );
      })}
    </section>
  );
}
