export interface ICrawler {
    setup(): Promise<void>;
    crawl(url: string): Promise<string>;
    extract(html: string): string[];
    write(data: string[], filename: string): void;
}
