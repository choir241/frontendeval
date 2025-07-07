interface ISearchFood {
  searchForFood: (e: string) => void;
}

export default function SearchFood({ props }: { props: ISearchFood }) {
  return (
    <input
      type="search"
      onChange={(e) => {
        props.searchForFood(e.target.value);
      }}
    />
  );
}
