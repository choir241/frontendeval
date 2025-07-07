interface ISpan {
  className: string;
  label: string | number;
}

export default function Span({ props }: { props: ISpan }) {
  return <span className={props.className}>{props.label}</span>;
}
