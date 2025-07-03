interface IInput {
  className: string;
  inputChangeHandler: (e: number) => void;
  placeholder: string;
  value: number;
}

export default function Input({ props }: { props: IInput }) {
  return (
    <input
      className={props.className}
      type="number"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.inputChangeHandler(Number(e.target.value))}
    />
  );
}
