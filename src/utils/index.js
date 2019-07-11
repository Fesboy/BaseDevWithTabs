export function mapPathToPaths(path) {
  const paths = path.split("/").filter(Boolean);
  return paths.map((_, i) => "/" + paths.slice(0, i + 1).join("/"));
}
