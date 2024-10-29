export function Show({ condition, children }) {
  if (condition) {
    return children;
  }
  return null;
}
