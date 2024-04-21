import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import fs from 'fs/promises';
dotenv.config();

const port = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV === 'development';
const base = process.env.BASE || '/';

async function createServer() {
  const templateHtml = !isDev
    ? await fs.readFile('./dist/client/index.html', 'utf-8')
    : '';
  const ssrManifest = !isDev
    ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
    : undefined;

  const app = express();

  let vite;
  if (isDev) {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(base, sirv('./dist/client', { extensions: [] }));
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '');

      let template;
      let render;
      if (isDev) {
        template = await fs.readFile(path.resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (
          await vite.ssrLoadModule(path.resolve('src/entry-server.tsx'))
        ).render;
      } else {
        template = templateHtml;
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const rendered = await render(req, ssrManifest);

      const html = template.replace('<!--ssr-outlet-->', rendered.html ?? '');

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      // eslint-disable-next-line no-console
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Client is listening on port: ${port}`);
  });
}

createServer();
