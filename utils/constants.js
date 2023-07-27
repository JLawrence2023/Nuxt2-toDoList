export const column1 = 1;
export const column2 = 2;
export const column3 = 3;
export const column4 = 4;
// Helper function to sort both numeric and alphabetical values
export function customSort(arr) {
  const numeric = arr.filter((item) => !isNaN(item));
  const alphabetical = arr.filter((item) => isNaN(item)).sort();
  return [...numeric.sort((a, b) => a - b), ...alphabetical];
}
