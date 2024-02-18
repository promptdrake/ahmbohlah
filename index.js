const puppeteer = require('puppeteer-extra');
const axios = require('axios');
const { faker } = require('@faker-js/faker');
const chalk = require('chalk');
const config = require("./config")
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
 
  async function createSpotifyAccount() {
    const username = faker.internet.userName();
    console.log('[Server] Name Found ' + username);
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--disable-gpu',
        '--disable-features=site-per-process',
        '--disable-features=NetworkService',
        '--disable-features=NetworkServiceInProcess',
        '--disable-infobars',
        '--disable-notifications',
        '--disable-popup-blocking',
        '--disable-hang-monitor',
        '--disable-breakpad',
        '--disable-cloud-import',
        '--disable-component-extensions-with-background-pages',
        '--disable-datasaver-prompt',
        '--disable-desktop-notifications',
        '--disable-ipc-flooding-protection',
        '--disable-renderer-backgrounding',
        '--enable-automation',
        '--force-dark-mode',
        '--hide-scrollbars',
        '--ignore-gpu-blocklist',
        '--lang=en',
        '--mute-audio',
        '--no-pings',
        '--no-zygote',
        '--use-gl=swiftshader',
        '--incognito', // Open the browser in incognito mode
        // `--disable-extensions-except=${extensionPath}`,
        // `--load-extension=${extensionPath}`,
    ],
    });
    const [page] = await browser.pages(); 
    await page.setDefaultNavigationTimeout(60000);
    console.log('[Server] Opening Browser...');
    await page.goto('https://www.canva.com/login', { waitUntil: 'domcontentloaded' });
    console.log('[Server] Visiting Canva Signup');
    await page.waitForTimeout(1000);

    await page.waitForSelector('button._1QoxDw.Qkd66A.tYI0Vw.o4TrkA.Eph8Hg.NT2yCg.Qkd66A.tYI0Vw.lsXp_w.cwOZMg.zQlusQ.uRvRjQ.COAWQQ._7IvJg');
    // console.log('[Server] Found the button, clicking...');
    await page.click('button._1QoxDw.Qkd66A.tYI0Vw.o4TrkA.Eph8Hg.NT2yCg.Qkd66A.tYI0Vw.lsXp_w.cwOZMg.zQlusQ.uRvRjQ.COAWQQ._7IvJg');
    await page.waitForSelector('input#\\:r4\\:.s_JGcg.fFOiLQ.eoXdOg');
await page.type('input#\\:r4\\:.s_JGcg.fFOiLQ.eoXdOg', username+`@${config.domain}`);
await page.evaluate((text) => {
  const buttons = document.querySelectorAll('button._1QoxDw span._38oWvQ');
  for (const button of buttons) {
    if (button.innerText.trim() === text) {
      button.click();
      return;
    }
  }
}, "Continue");
await page.waitForSelector('button._1QoxDw.Qkd66A.tYI0Vw.o4TrkA.zKTE_w.Qkd66A.tYI0Vw.lsXp_w.ubW6qw.cwOZMg.uRvRjQ._6TrfRQ span._38oWvQ', { visible: true });
await page.evaluate((text) => {
  const buttons = document.querySelectorAll('button._1QoxDw span._38oWvQ');
  for (const button of buttons) {
    if (button.innerText.trim() === text) {
      button.click();
      return;
    }
  }
}, "Create your account");
await page.waitForTimeout(3000);

let otpResponse;
while (true) {
  const response = await axios.get(`https://aisbirapi.cyclic.app/api/get/canva/${username}@${config.domain}`);
  const data = response.data;

  if (data.otp) {
    otpResponse = data;
    console.log(data)
    break;
  } else if (data.status && data.code === 'CANVA_WAITING_FOR_CODE') {
    console.log(data);
    await page.waitForTimeout(3000);
  } else {

    break;
  }
}
await page.waitForSelector('input[type="text"]');
await page.type('input[type="text"]', otpResponse.otp, { delay: 200});
delete otpResponse
await axios.get(`https://aisbirapi.cyclic.app/api/get/delete/canva/${username + `@` + config.domain}`).then((data) =>{
  console.log("[+] Mail Cleared...")
})
await page.waitForTimeout(3000);
await page.goto('https://www.canva.com/login/reset', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('input[type="text"]');
await page.type('input[type="text"]', username+`@${config.domain}`);
await page.evaluate((text) => {
  const buttons = document.querySelectorAll('button._1QoxDw span._38oWvQ');
  for (const button of buttons) {
    if (button.innerText.trim() === text) {
      button.click();
      return;
    }
  }
}, "Continue");
await page.waitForTimeout(6000);
while (true) {
  const response = await axios.get(`https://aisbirapi.cyclic.app/api/get/canva/${username}@${config.domain}`);
  const data = response.data;

  if (data.otp) {
    otpResponse = data;
    console.log(data)
    break;
  } else if (data.status && data.code === 'CANVA_WAITING_FOR_CODE') {
    console.log(data);
    await page.waitForTimeout(3000);
  } else {

    break;
  }
}
await page.waitForSelector('input[type="text"]');
await page.type('input[type="text"]', otpResponse.otp);
await page.waitForTimeout(1000);
await page.type('input[placeholder="New password"]', config.password);
await page.type('input[placeholder="Confirm new password"]', config.password);
await page.waitForTimeout(1000);
await page.evaluate((text) => {
  const buttons = document.querySelectorAll('button._1QoxDw span._38oWvQ');
  for (const button of buttons) {
    if (button.innerText.trim() === text) {
      button.click();
      return;
    }
  }
}, "Set password");
const resultString = `\n${username}@${config.domain}|${config.password}`;
fs.appendFileSync('result.txt', resultString);
  await page.waitForTimeout(5000);
  await browser.close()
  }
  
async function askUserCount() {
  const sigma = `
  █▀▀ ▄▀█ █▄░█ █░█ ▄▀█   ▄▀█ █▀▀ █▀▀ █▀█ █░█ █▄░█ ▀█▀  
  █▄▄ █▀█ █░▀█ ▀▄▀ █▀█   █▀█ █▄▄ █▄▄ █▄█ █▄█ █░▀█ ░█░  
  
  █▀▀ █▀▀ █▄░█ █▀▀ █▀█ ▄▀█ ▀█▀ █▀█ █▀█
  █▄█ ██▄ █░▀█ ██▄ █▀▄ █▀█ ░█░ █▄█ █▀▄
  
  █▀█ █ █░░   ░░█ █ █▀█ █▀█ █▀█ █▀█ █▀█ █▀█ █▀█ █▀█
  █▀▄ █ █▄▄   █▄█ █ █▀▄ █▀▄ █▀▄ █▀▄ █▀▄ █▀▄ █▀▄ █▀▄
`
console.log(chalk.cyan(sigma))
console.log(`Creator: https://t.me/penyukaberuang`)
console.log(`\n`+chalk.blue(`sc ini berfungsi cuma buat generate\nakun canva pake domain gw `)+ `tapi kalok\npake domainmu chat aja ke https://t.me/aisbirkoenz\nAda jasa setupnya yoi kan :v\n`+chalk.red(`Tinggal login aja satset gausah nunggu otp\nemail|password`))
    rl.question(chalk.yellow('\nPress Ctrl+c to exit\n===================\n(+) ') + 'How many Canva accounts do you want to create?\n- ', async (count) => {
      count = parseInt(count);
      if (isNaN(count) || count < 1) {
        console.log('Please Enter Number Only!');
        askUserCount();
      } else {
        puppeteer.use(StealthPlugin());
        for (let i = 0; i < count; i++) {
          console.log(chalk.green(`(+) Creating Canva Account ${i + 1}`));
          await createSpotifyAccount();
          console.log(chalk.green(`(+) Succsesfully Creating canva Account ${i + 1}`));
        }
     askUserCount();
      }
    });
  }
  askUserCount();