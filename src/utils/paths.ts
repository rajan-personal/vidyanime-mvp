export function getAssetPath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}