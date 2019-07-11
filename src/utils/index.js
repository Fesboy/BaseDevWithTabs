export function mapPathToPaths(path) {
  const pathItems = path.split("/").filter(Boolean);
  const paths = pathItems.map(
    (_, i) => "/" + pathItems.slice(0, i + 1).join("/")
  );
  return paths.length ? paths : ["/"];
}
