# inetasia-puppeteer
[![CircleCI](https://circleci.com/gh/thestrayed/inetasia-puppeteer.svg?style=svg)](https://circleci.com/gh/thestrayed/inetasia-puppeteer) [![Coverage Status](https://coveralls.io/repos/github/thestrayed/inetasia-puppeteer/badge.svg?branch=master)](https://coveralls.io/github/thestrayed/inetasia-puppeteer?branch=master)

Another small assignment to crawl data from website. Here is a [link](https://inetasia.github.io/nodejs.html) to original website.
Please note that I choose to only do the second part of the assignment which utilize puppeteer to craw website.

## About project

Crawl given website and then save those information to file.

## Project design

I choose to create `crawler` class which uses to do everything coming as follows:

```typescript
setup(): Promise<void>;
```
Set up puppeteer to private variable so crawler can reuse that

```typescript
crawl(url: string): Promise<string>;
```
Crawl given url which return `html` content

```typescript
extract(html: string): string[];
```
Extract information from `html` and return `coupons` as `string[]`

```typescript
write(data: string[], filename: string): void;
```
Write those informations to file

# Getting started

### Installation

1. Clone project

1. Install project's dependencies

    ```bash
    yarn
    ```

### Build project

1. Build `dist` folder

    ```bash
    yarn build
    ```

1. Run console application

    ```bash
    node dist/index.js
    ```

### Test

1. Running follow command to execute test

    ```bash
    yarn test
    ```

