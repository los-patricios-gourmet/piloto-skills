import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const port = Number(process.env.PORT || 3100);
const types = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".json": "application/json",
};
const server = createServer((req, res) => {
  try {
    const path = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    let file = resolve(root, "." + path);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      return res.end();
    }
    // Next 16.4 serializes segment names with dots; Windows exports those segments as directories.
    if (
      !existsSync(file) &&
      file.includes("__next.") &&
      file.endsWith(".txt")
    ) {
      const prefix = file.slice(0, file.lastIndexOf("__next.") + 7);
      const segments = file
        .slice(file.lastIndexOf("__next.") + 7, -4)
        .split(".");
      file = prefix + segments.join(sep) + ".txt";
    }
    if (existsSync(file) && statSync(file).isDirectory())
      file = resolve(file, "index.html");
    if (!existsSync(file)) {
      res.writeHead(404);
      return res.end("Not found");
    }
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Content-Length": statSync(file).size,
      "Cache-Control": "no-cache",
    });
    if (req.method === "HEAD") return res.end();
    createReadStream(file)
      .on("error", () => res.destroy())
      .pipe(res);
  } catch {
    res.writeHead(400);
    res.end("Bad request");
  }
});
server.listen({ port, host: "127.0.0.1", backlog: 1024 }, () =>
  console.log(`Preview: http://127.0.0.1:${port}/pe/`),
);
