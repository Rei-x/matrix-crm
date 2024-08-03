import { createRequestHandler } from "@remix-run/express";
import express from "express";
import { app } from "./server/server.js";

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

app.use(
  viteDevServer ? viteDevServer.middlewares : express.static("build/client")
);

const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
  : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore it's on the server only
    // eslint-disable-next-line import/no-unresolved
    await import("../build/server/index.js");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore it's on the server only
app.all("*", createRequestHandler({ build }));

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
