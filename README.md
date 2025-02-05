This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

Here are some key benefits of this approach:

1. Scalability: As your application grows, you can easily add new features or modify existing ones without affecting other parts of the system.
2. Maintainability: The separation of concerns makes it easier to understand and maintain the codebase over time.
3. Testability: You can unit test your business logic (use cases) independently of the UI or data storage mechanism.
4. Flexibility: You can easily swap out components. For example, you could replace the InMemoryTaskRepository with a real database implementation without changing the business logic or UI.