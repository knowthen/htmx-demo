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

const allPeople = [
  'Emma Clarke',
  'Liam Johnson',
  'Sophia Martinez',
  'Ethan Brown',
  'Olivia Smith',
  'Mason Williams',
  'Ava Davis',
  'Noah Miller',
  'Isabella Wilson',
  'Lucas Anderson',
];

const app = new Elysia()
  .use(html())
  .get('/', ({ query, headers }) => {
    console.log(headers);
    const q = query['q'];
    const hxTrigger = headers['hx-trigger'];
    let people;
    if (q) {
      people = allPeople.filter((person) => person.toLowerCase().includes(q));
    } else {
      people = allPeople;
    }
    if (hxTrigger === 'q') {
      return (
        <>
          {people.map((person) => (
            <li>{person}</li>
          ))}
        </>
      );
    }
    return (
      <Layout>
        <h1>Contacts</h1>
        <form action="/" method="GET">
          <input
            autocomplete="off"
            type="search"
            name="q"
            id="q"
            value={q}
            hx-get="/"
            hx-trigger="search, keyup delay:300ms changed"
            hx-target="ul"
            hx-push-url="true"
          />
        </form>
        <ul>
          {people.map((person) => (
            <li>{person}</li>
          ))}
        </ul>
      </Layout>
    );
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
