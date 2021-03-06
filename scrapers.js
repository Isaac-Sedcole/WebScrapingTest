// use "node scrapers.js" to run
const puppeteer = require('puppeteer-core');
const rimraf = require('del');

const PATHS = {
    win32: {
        executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        userDataDir: 'C:\\Users\\<USERNAME>\\AppData\\Local\\Temp\\puppeteer_user_data',
    },
    linux: {
        executablePath: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        userDataDir: '/mnt/c/Users/<USERNAME>/AppData/Local/Temp/puppeteer_user_data',
    },
}

//if i could run this at the same time for all games then it wouldnt take too long instead of running 
//one at a time and waiting for the one before it to complete before doing another

async function main() {

  try{

    const browser = await puppeteer.launch({
      executablePath: PATHS[process.platform].executablePath,
      userDataDir: PATHS.win32.userDataDir,
      headless: true,
      args: [`--window-size=${800},${800}`]
    });
    const page = await browser.newPage();
    //only works on pages that arent age gated
    await page.goto('https://store.steampowered.com/app/703080/Planet_Zoo/')
    // await page.screenshot({path: `${__dirname}/screenshots/storepage.png`})
    
    // await page.waitForXPath('//*[@id="game_highlights"]/div[1]/div/div[4]/div/div[2]')
    const [el] = await page.$x('//*[@id="game_highlights"]/div[1]/div/div[4]/div/div[2]')
    const txt = await el.getProperty('textContent')
    let rawTxt = await txt.jsonValue()

    rawTxt = rawTxt.toString().replace(/\t/g, '').split('\r\n')
    rawTxt = rawTxt.toString().replace(/\n/g, " ").split('\r\n')
    rawTxt = rawTxt.toString().replace("+", "").split('\r\n')
    let listOfStrings = rawTxt.toString().split(" ")
    
    //we want this
    const filteredList = listOfStrings.filter(stringers => stringers != "")

    //image
    // await page.waitForXPath('//*[@id="game_highlights"]/div[1]/div/div[1]/img')
    // const [e2] = await page.$x('//*[@id="game_highlights"]/div[1]/div/div[1]/img')
    // const src = await e2.getProperty('src')
    // const imgURL = await src.jsonValue()
    
    console.log({rawTxt, listOfStrings, filteredList})
    // console.log({imgURL, rawTxt, listOfStrings, filteredList})
    
    await browser.close();
  } catch(e) {
    console.log(e, "ERROR")
  }
}

main().finally(async () => {
    await rimraf(PATHS[process.platform].userDataDir, {force: true})
}).catch(err => {
    console.error(err);
    process.exit(1);
});

















// const puppeteer = require('puppeteer-core')

// async function scrapeProduct(url) {
//     const browserFetcher = puppeteer.createBrowserFetcher()
//     const revisionInfo = await browserFetcher.download('856583')
//     const browser = await puppeteer.launch({
//         executablePath: revisionInfo.executablePath,
//         // executablePath: 'chrome.exe',
//         headless: true,
//         args: ['--no-sandbox', '--disable-setuid-sandbox',
//         // "--disable-gpu",
//         // "--disable-dev-shm-usage"
//       ]
//       })
//     const page = await browser.newPage()
//     page.goto(url)


//     // const [el] = await page.$x('//*[@id="game_highlights"]/div[1]/div/div[4]/div/div[2]')
//     // page.waitForSelector("html")
//     // await page.waitForNavigation()
//     const [el] = await page.$x('//*[@id="price_inside_buybox"]')
//     // const [el] = await page.$x('//*[@id="SHORTCUT_FOCUSABLE_DIV"]/div[1]/header/div/div[1]/a/svg[2]')
//     // const [el] = await page.$x('/html/body/div[1]/div[7]/div[4]/div[1]/div[3]/div[2]/div[2]/div/div[3]')
//     // console.log(el)
//     const src = el.getProperty('src')
//     const srcTxt = await src.jsonValue()

//     console.log({srcTxt})
// }

// scrapeProduct("https://www.amazon.com/gp/product/B088P2KKHS?pf_rd_r=G6Z98SXHXREZMVKHJMW6&pf_rd_p=6fc81c8c-2a38-41c6-a68a-f78c79e7253f&pd_rd_r=63e668ce-14c0-44f8-8b72-d16743cb6710&pd_rd_w=S8oIF&pd_rd_wg=q2JXw&ref_=pd_gw_unk").catch((err)=> {
//   console.log(err)
// })