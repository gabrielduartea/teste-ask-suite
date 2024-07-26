// crawler.js
const puppeteer = require('puppeteer');

async function getRoomPrices(checkin, checkout) {
  const browser = await puppeteer.launch({
    // headless: false,
  });

  const page = await browser.newPage();

  const url = `https://reservations.fasthotel.me/188/214?entrada=${checkin}&saida=${checkout}&adultos=1#acomodacoes`;
  await page.goto(url,{ waitUntil: 'networkidle2' });
  await page.waitForSelector('.row.borda-cor');
  const rooms = await page.evaluate(() => {
    const roomElements = document.querySelectorAll('.row.borda-cor');
    const roomPrices = [];

    roomElements.forEach(room => {
        const nameElement = room.querySelector('h3[data-campo="titulo"]');
        const descriptionElement = room.querySelector('.quarto.descricao');
        const priceElement = room.querySelector('b[data-campo="valor"]');
        const imageElement = room.querySelector('a[data-fancybox="images"]');
        
        const name = nameElement ? nameElement.textContent.trim() : null;
        const description = descriptionElement ? descriptionElement.textContent.trim() : null;
        const price = priceElement ? priceElement.textContent.trim() : null;
        const image = imageElement ? imageElement.href : null;
        roomPrices.push({ name, description, price, image });
    });
    
    return roomPrices;
  });

  await browser.close();
  return rooms;
}

module.exports = { getRoomPrices };
