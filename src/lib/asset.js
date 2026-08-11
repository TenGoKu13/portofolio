const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path) {
  if (!path) return path;

  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${BASE_PATH}${path.startsWith("/") ? "" : "/"}${path}`;
}
