const { isSortedDescending } = require("./index");


test('Should return true for descending dates', () => {
  const result = isSortedDescending(['2023-04-01T00:00:00', '2023-03-31T00:00:00', '2023-03-30T00:00:00']);
  expect(result).toBe(true);
});

test('Should return false for unsorted dates', () => {
  const result = isSortedDescending(['2023-03-31T00:00:00', '2023-04-01T00:00:00', '2023-03-30T00:00:00']);
  expect(result).toBe(false);
});

test('Should return true for equal dates', () => {
  const result = isSortedDescending(['2023-04-01T00:00:00', '2023-04-01T00:00:00', '2023-04-01T00:00:00']);
  expect(result).toBe(true);
});

test('Should return true for an empty array', () => {
  const result = isSortedDescending([]);
  expect(result).toBe(true);
});

test('Should return true for a single element', () => {
  const result = isSortedDescending(['2023-04-01T00:00:00']);
  expect(result).toBe(true);
});
