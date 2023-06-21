This simple [Medium](https://medium.com/) clone was built with [Next.js](https://nextjs.org/) and a [Contentful](https://www.contentful.com/) CMS backend.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Choices

The website was built using Next.JS' Static Site Generation capabilities. This allows for the website to be built once and served statically, which is great for performance and SEO.

A Contentful Webhook was set up to trigger a rebuild of the website whenever content is published. This allows for the website to be updated without having to manually rebuild it.
