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
      <body>
        <main class="container">{children}</main>
      </body>
    </html>
  );
};

const app = new Elysia()
  .use(html())
  .get('/', () => {})
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
