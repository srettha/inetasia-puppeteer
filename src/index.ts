import Crawler from './lib/crawler';

const crawler = new Crawler();

(async () => {
    await crawler.setup();
    const html = await crawler.crawl();
    const coupons = crawler.extract(html);
    crawler.write(coupons);
})();
