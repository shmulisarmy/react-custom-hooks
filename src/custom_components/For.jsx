export function For({ each, childComponentMaker }) {
  return <>
    {each.map(childComponentMaker)}
  </>;
}
