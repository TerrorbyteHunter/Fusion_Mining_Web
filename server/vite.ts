import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { type Server } from "http";
import { nanoid } from "nanoid";

export let viteLogger: any;

export async function setupVite(app: Express, server: Server) {
  // Dynamically import Vite at runtime only in development so that production
  // builds (and server bundles) do not include Vite and its native optional
  // dependencies (like rollup platform binaries). This prevents server
  // bundles from pulling in platform-specific native packages.
  const viteModule = await import('vite');
  const createViteServer = viteModule.createServer;
  viteLogger = viteModule.createLogger();

  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  // When running Vite in middlewareMode inside our Express server we must
  // avoid using the HTTP proxy defined in the client's `vite.config.ts`.
  // If the proxy remains enabled it will attempt to connect back to the
  // same server process (via localhost) and can cause socket/DNS errors
  // (ENOBUFS) or recursive proxying. Explicitly set an empty `proxy`
  // config here to disable that behaviour.
  // Load the React plugin directly and avoid loading the client's vite
  // config file. Loading the client's `vite.config.ts` can re-enable the
  // HTTP proxy (and other settings) which we need to control when Vite is
  // embedded as middleware. Setting `configFile: false` and providing the
  // minimal necessary options prevents accidental proxying back to this
  // process and avoids ENOBUFS / recursive proxy issues.
  const reactPlugin = await import('@vitejs/plugin-react').then((m) => m.default);

  const vite = await createViteServer({
    root: path.resolve(import.meta.dirname, '..', 'client'),
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg: any, options: any) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: {
      ...serverOptions,
      // disable the http proxy when embedding Vite into our server process
      proxy: {},
    },
    appType: "custom",
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '..', 'client', 'src'),
        '@shared': path.resolve(import.meta.dirname, '..', 'shared'),
        // Serve project-level assets from the attached_assets folder during dev
        '@assets': path.resolve(import.meta.dirname, '..', 'attached_assets'),
      },
    },
    plugins: [reactPlugin()],
  });

  // Serve project-level static assets (images, PDFs) from /attached_assets in dev
  // This mirrors how the client imports files via the @assets alias and allows
  // dynamic image_url values (e.g. '/attached_assets/files/...') to be reachable
  // when running the dev server.
  app.use('/attached_assets', express.static(path.resolve(import.meta.dirname, '..', 'attached_assets')));

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Build output is in build/public, but since this is called from server/vite.ts,
  // we need to go up one level from server/ to get to project root, then to build/public
  const distPath = path.resolve(import.meta.dirname, "..", "build", "public");
  const attachedAssetsPath = path.resolve(import.meta.dirname, "..", "attached_assets");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve attached assets (uploads and static files) in production
  if (fs.existsSync(attachedAssetsPath)) {
    app.use('/attached_assets', express.static(attachedAssetsPath));
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    try {
      const indexFile = path.resolve(distPath, "index.html");
      const exists = fs.existsSync(indexFile);
      console.log(`Static fallback: ${req.method} ${req.originalUrl} -> index.html exists=${exists} path=${indexFile}`);
      if (!exists) {
        // Let Express return its default 404 if index is missing
        res.status(404).send('Not Found');
        return;
      }
      res.sendFile(indexFile);
    } catch (e) {
      console.error('Error serving index.html fallback:', e instanceof Error ? e.stack || e.message : String(e));
      res.status(500).send('Internal Server Error');
    }
  });
}
