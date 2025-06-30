
const puppeteer = require("puppeteer")

async function getTrendingTopics() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto("https://trends.google.com/trends/trendingsearches/daily?geo=IN")
  const topics = await page.evaluate(() => {
    const topicElements = document.querySelectorAll(".title span")
    return Array.from(topicElements).map(el => el.textContent)
  })
  await browser.close()
  return topics
}

module.exports = getTrendingTopics
