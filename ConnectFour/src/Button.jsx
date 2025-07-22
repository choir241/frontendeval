export default function button(onClick, label) {
  return <button onClick={() => onClick}>{label}</button>;
}
