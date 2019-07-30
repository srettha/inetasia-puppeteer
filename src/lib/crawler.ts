import cheerio from 'cheerio';
import fs from 'fs';
import puppeteer, { Browser, Page } from 'puppeteer';

import { ICrawler } from 'typings/crwaler';

class Crawler implements ICrawler {
    private browser: Browser;
    private page: Page;
    private path: string = './data';
    private readonly url: string = 'https://inetasia.github.io/puppeteer.html';

    public async setup(): Promise<void> {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
    }

    public async crawl(url: string = this.url): Promise<string> {
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        return this.page.content();
    }

    public extract(html: string): string[] {
        const $ = cheerio.load(html);
        const [{ children }] = $('ul').eq(1).toArray();

        return children.map((child) => {
            return $(child).text();
        });
    }

    public write(data: string[], filename: string = 'coupons'): void {
        return fs.writeFileSync(`${this.path}/${filename}.csv`, data);
    }
}

export default Crawler;
