import fs from 'fs';
import puppeteer from 'puppeteer';

import Crawler from '../../src/lib/crawler';

describe('lib/crawler', () => {
    describe('Crawler', () => {
        let crawler: Crawler;

        beforeAll(() => {
            crawler = new Crawler();
        });

        it ('should exist', () => {
            expect(crawler).toBeTruthy();
        });

        describe('setup()', () => {
            it('should have setup crawler when call setup function', async () => {
                const stubPuppeteer = puppeteer.launch = jest.fn().mockResolvedValue(({
                    newPage: () => Promise.resolve(),
                }));

                await crawler.setup();
                expect(stubPuppeteer.mock.calls.length).toBe(1);
            });
        });

        describe('crawl()', () => {
            it('should crawl given url site and return its content', async () => {
                const expected = '<html></html>';
                const stubPuppeteer = puppeteer.launch = jest.fn().mockResolvedValue(({
                    newPage: () => ({
                        goto: () => Promise.resolve(),
                        content: () => Promise.resolve(expected),
                    }),
                }));

                await crawler.setup();
                const actual = await crawler.crawl();
                expect(stubPuppeteer.mock.calls.length).toBe(1);
                expect(actual).toEqual(expected);
            });
        });

        describe('extract()', () => {
            it('should return array of li from html', async () => {
                const expected = ['ABCD', 'EFGH'];
                const stubPuppeteer = puppeteer.launch = jest.fn().mockResolvedValue(({
                    newPage: () => ({
                        goto: () => Promise.resolve(),
                        content: () => Promise.resolve('<ul></ul><ul><li>ABCD</li><li>EFGH</li></ul><ul></ul>'),
                    }),
                }));

                await crawler.setup();
                const html = await crawler.crawl();
                const actual = crawler.extract(html);
                expect(stubPuppeteer.mock.calls.length).toBe(1);
                expect(actual).toEqual(expected);
            });
        });

        describe('write()', () => {
            it('should write file', async () => {
                const stubPuppeteer = puppeteer.launch = jest.fn().mockResolvedValue(({
                    newPage: () => ({
                        goto: () => Promise.resolve(),
                        content: () => Promise.resolve('<ul></ul><ul><li>ABCD</li><li>EFGH</li></ul><ul></ul>'),
                    }),
                }));
                const stubFS = fs.writeFileSync = jest.fn().mockReturnValue(true);

                await crawler.setup();
                const html = await crawler.crawl();
                const data = crawler.extract(html);
                crawler.write(data);
                expect(stubPuppeteer.mock.calls.length).toBe(1);
                expect(stubFS.mock.calls.length).toBe(1);
            });
        });
    });
});
