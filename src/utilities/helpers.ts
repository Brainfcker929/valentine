interface windowDimension {
  width: number;
  height: number;
}
export function generateCatImagesArray(length: number): string[] {
  return Array.from({ length }, (_, index) => `/cats/cat${index + 1}.jpg`);
}

export function handleWindowResize(windowDimension: windowDimension): void {
  windowDimension.width = window.innerWidth;
  windowDimension.height = window.innerHeight;
}
