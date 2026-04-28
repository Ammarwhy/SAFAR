import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { apiRateLimiter } from './middleware/rateLimiter';
import { globalErrorHandler } from './middleware/errorHandler';
import { createProxyHandler } from './proxy/createProxy';
import { serviceUrls } from './config';

export const createGatewayApp = (): express.Express => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(apiRateLimiter);

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/auth', createProxyHandler(serviceUrls.auth));
  app.use('/trips', createProxyHandler(serviceUrls.trip));
  app.use('/matches', createProxyHandler(serviceUrls.matching));
  app.use('/chat', createProxyHandler(serviceUrls.chat));
  app.use('/expenses', createProxyHandler(serviceUrls.expense));
  app.use('/safety', createProxyHandler(serviceUrls.safety));
  app.use('/agencies', createProxyHandler(serviceUrls.agency));

  app.use(globalErrorHandler);

  return app;
};
