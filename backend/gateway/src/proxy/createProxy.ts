import type { NextFunction, Request, Response } from 'express';

const hopByHopHeaders = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

export const createProxyHandler = (targetBaseUrl: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const upstreamUrl = new URL(req.originalUrl.replace(/^\/(auth|trips|matches|chat|expenses|safety|agencies)/, ''), targetBaseUrl);

      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (!value || hopByHopHeaders.has(key.toLowerCase())) {
          continue;
        }

        if (Array.isArray(value)) {
          headers.set(key, value.join(','));
          continue;
        }

        headers.set(key, value);
      }

      const body = req.method === 'GET' || req.method === 'HEAD' ? undefined : JSON.stringify(req.body ?? {});
      if (body) {
        headers.set('content-type', headers.get('content-type') ?? 'application/json');
      }

      const upstreamResponse = await fetch(upstreamUrl, {
        method: req.method,
        headers,
        body,
      });

      res.status(upstreamResponse.status);
      upstreamResponse.headers.forEach((value, key) => {
        if (!hopByHopHeaders.has(key.toLowerCase())) {
          res.setHeader(key, value);
        }
      });

      const responseText = await upstreamResponse.text();
      if (responseText.length === 0) {
        res.end();
        return;
      }

      res.send(responseText);
    } catch (error) {
      next(error);
    }
  };
};
