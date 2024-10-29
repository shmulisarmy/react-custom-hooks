export function For({ each, children }) {
  return <>
    {each.map(children)}
  </>;
}
