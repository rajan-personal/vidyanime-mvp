// Utility function to handle base paths for GitHub Pages
export function getBasePath(): string {
  return process.env.NODE_ENV === 'production' ? '/school-project' : '';
}

export function getAssetPath(path: string): string {
  const basePath = getBasePath();
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}