import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';

const Layout = ({ children }: { children: any }) => {
  return (
    <html lang="en">
      <head>
        <title>HTMX</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css"
        />
        <script
          src="https://unpkg.com/htmx.org@1.9.11"
          integrity="sha384-0gxUXCCR8yv9FM2b+U3FDbsKthCI66oH5IA9fHppQq9DDMHuMauqq1ZHBpJxQ0J0"
          crossorigin="anonymous"
        ></script>
      </head>
      <body hx-boost="true">
        <main class="container">{children}</main>
      </body>
    </html>
  );
};

const app = new Elysia()
  .use(html())
  .get('/', () => {
    return (
      <Layout>
        <h1>Home</h1>
        <a href="/about">About</a>
      </Layout>
    );
  })
  .get('/about', () => {
    return (
      <Layout>
        <h1>About</h1>
        <a href="/">Home</a>
      </Layout>
    );
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
