// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

/*
validate that EXACTLY the first 100 articles are sorted from 
newest to oldest @https://news.ycombinator.com/newest
*/
async function sortHackerNewsArticles() {
  let browser;
  try {
  // launch browser
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // my code
  
    // wait for page to load
    await page.waitForSelector(".morelink");
    await page.waitForLoadState("networkidle");

    let all_time_stamps = [];
    while (all_time_stamps .length < 100) {
      const article_time_stamps = page.locator(".age");
      const elements = await article_time_stamps.elementHandles();
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const time_stamp = await element.getAttribute("title");
        all_time_stamps.push(time_stamp);
        if (all_time_stamps.length >= 100) {
          break;
        }
      }
      await page.waitForSelector(".morelink");
      await page.click(".morelink");
      await page.waitForLoadState("networkidle");
    }

    all_time_stamps = all_time_stamps.slice(0, 100);
    if (isSortedDescending(all_time_stamps)) {
      console.log("Is sorted from newest to oldest");
    }
    else {
      console.log("Not sorted from newest to oldest");
    }
  } catch (error) {
    console.error("An error occured:", error);
  } finally {
    await browser.close();
  }
}


function isSortedDescending(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (new Date(arr[i+1]) > new Date(arr[i])) {
      return false;
    }
  }
  return true;
}
module.exports = { 
  sortHackerNewsArticles,
  isSortedDescending,
};


if (require.main === module) {
  (async () => {
    await sortHackerNewsArticles();
  })();
}

