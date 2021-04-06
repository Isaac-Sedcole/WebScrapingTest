const puppeteer = require('puppeteer')

async function scrapeProduct(url) {
    const browserFetcher = puppeteer.createBrowserFetcher()
    const revisionInfo = await browserFetcher.download('856583')
    const browser = await puppeteer.launch({
        executablePath: revisionInfo.executablePath,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox',"--disable-gpu",
        "--disable-dev-shm-usage"]
      })
    const page = await browser.newPage()
    page.goto(url)


    // const [el] = await page.$x('//*[@id="game_highlights"]/div[1]/div/div[4]/div/div[2]')
    // page.waitForSelector("html")
    
    const [el] = await page.$x('//*[@id="price_inside_buybox"]')
    // const [el] = await page.$x('//*[@id="SHORTCUT_FOCUSABLE_DIV"]/div[1]/header/div/div[1]/a/svg[2]')
    // const [el] = await page.$x('/html/body/div[1]/div[7]/div[4]/div[1]/div[3]/div[2]/div[2]/div/div[3]')
    console.log(el)
    const src = el.getProperty('src')
    const srcTxt = await src.jsonValue()

    console.log({srcTxt})
}

scrapeProduct("https://www.amazon.com/gp/product/B088P2KKHS?pf_rd_r=G6Z98SXHXREZMVKHJMW6&pf_rd_p=6fc81c8c-2a38-41c6-a68a-f78c79e7253f&pd_rd_r=63e668ce-14c0-44f8-8b72-d16743cb6710&pd_rd_w=S8oIF&pd_rd_wg=q2JXw&ref_=pd_gw_unk")