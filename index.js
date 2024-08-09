// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

/*
validate that EXACTLY the first 100 articles are sorted from 
newest to oldest @https://news.ycombinator.com/newest
*/
async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // my code
  

  // // wait for page to load
  // await page.waitForSelector(".morelink");
  // await page.waitForLoadState("networkidle");

  // let all_time_stamps = [];
  // while (all_time_stamps .length < 100) {
  //   const article_time_stamps = page.locator(".age");
  //   const elements = await article_time_stamps.elementHandles();
  //   for (let i = 0; i < elements.length; i++) {
  //     const element = elements[i];
  //     const time_stamp = await element.getAttribute("title");
  //     all_time_stamps.push(time_stamp);
  //     if (all_time_stamps.length >= 100) {
  //       break;
  //     }
  //   }
  //   await page.waitForSelector(".morelink");
  //   await page.click(".morelink");
  //   await page.waitForLoadState("networkidle");
  // }

  // if (isSortedDecending(all_time_stamps)) {
  //   console.log("Is sorted from newest to oldest");
  // }
  // else  {
  //   console.log("Not sorted from newest to oldest");
  // }
}


function isSortedDecending(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i+1] > arr[i]) {
      return false;
    }
  }
  return true;
}


(async () => {
  await sortHackerNewsArticles();
})();
