const { sortHackerNewsArticles, isSortedDescending } = require("./index");
const { chromium } = require('playwright');

jest.mock('playwright');

describe('sortHackerNewsArticles', () => {
  let browser, context, page;

  beforeEach(() => {
    // Mock browser, context, and page objects
    page = {
      goto: jest.fn(),
      waitForSelector: jest.fn(),
      waitForLoadState: jest.fn(),
      locator: jest.fn(),
      click: jest.fn(),
    };
    context = { newPage: jest.fn().mockResolvedValue(page) };
    browser = { newContext: jest.fn().mockResolvedValue(context), close: jest.fn() };
    
    chromium.launch = jest.fn().mockResolvedValue(browser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches 100 articles and handles pagination correctly', async () => {
    const mockTimestamps = Array.from({ length: 100 }, (_, i) => `2024-08-01T00:${i < 10 ? '0' : ''}${i}:00Z`);
    page.locator.mockReturnValue({
      elementHandles: jest.fn().mockResolvedValue(
        mockTimestamps.map((timestamp) => ({ getAttribute: jest.fn().mockResolvedValue(timestamp) }))
      ),
    });

    await sortHackerNewsArticles();

    expect(page.goto).toHaveBeenCalledWith("https://news.ycombinator.com/newest");
    expect(page.waitForSelector).toHaveBeenCalledWith(".morelink");
    expect(page.click).toHaveBeenCalledWith(".morelink");
    expect(page.waitForLoadState).toHaveBeenCalledWith("networkidle");
    expect(browser.close).toHaveBeenCalled();
  });

  test('handles errors gracefully', async () => {
    const errorMessage = "Some error";
    page.goto.mockRejectedValue(new Error(errorMessage));

    console.error = jest.fn(); // Mock console.error

    await sortHackerNewsArticles();

    expect(console.error).toHaveBeenCalledWith("An error occured:", new Error(errorMessage));
    expect(browser.close).toHaveBeenCalled();
  });
});

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
