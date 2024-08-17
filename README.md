This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Usage instruction

Public URL: https://tradingtoolapp.vercel.app/
Login URL : https://tradingtoolapp.vercel.app/login

When login: 
-   Please login with google by clicking the google icon
-   This site can only login with gmail: duchoan99.com@gmail.com

When logged in:
This project has 2 different databases which mean:
-   if you create a post in the VI language, you can only see it whenever you change the language to VI, and it is also true on the opposite.

Post Types:

Text format's styles:  
\<b> - Bold text \</b><br />
\<strong> - Important text \</strong><br />
\<i> - Italic text \</i><br />
\<em> - Emphasized text \</em><br />
\<mark> - Marked text \</mark><br />
\<small> - Smaller text \</small><br />
\<del> - Deleted text \</del> <br />
\<ins> - Inserted text \</ins><br />
\<sup> - Superscript text \</sup><br />
\<sub> - Subscript text \</sub><br />

List format:
\<ul>\<li>List 1\</li>\<li>List 2\</li>\<li>List 3\</li>\</ul><br />

Link format:
\<a href=\"https:\/\/www.google.com\">Google\<\/a><br />

When it comes to creating posts in video and audio formats, please provide an embed URL(not the public URL).  
How to get the embed URL:  

For video(example on youtube): 
-   Open youtube video .
-   Find share button right below the video and click on it.
-   On small windows open, choose embed icon.
-   CLick copy URL (which begin with <iframe>) and paste it into videoURL.
-   You can also change the size of the video by changing the width and height in the URL. (Ex: width="100%" height="400")

For audio(example with soundcloud):
-   Open soundcloud audio .
-   Find share button right below the video and click on it.
-   On small windows open, choose embed tab.
-   Copy the whole URL inside code area (which begin with <iframe>) and paste it into audioURL.

For picture:
-   The size will automatically be adjusted to the screen size.

Report issues:
Please report issues with the following format:  
-   name issue:
-   actual result:
-   expected result:
-   how to create it step by step:
