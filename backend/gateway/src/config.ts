import { loadBackendEnv } from '../../shared/src/env';

export const env = loadBackendEnv(process.env);

export const serviceUrls = {
  auth: process.env.AUTH_SERVICE_URL ?? 'http://localhost:4101',
  trip: process.env.TRIP_SERVICE_URL ?? 'http://localhost:4102',
  matching: process.env.MATCHING_SERVICE_URL ?? 'http://localhost:4103',
  chat: process.env.CHAT_SERVICE_URL ?? 'http://localhost:4104',
  expense: process.env.EXPENSE_SERVICE_URL ?? 'http://localhost:4105',
  safety: process.env.SAFETY_SERVICE_URL ?? 'http://localhost:4106',
  agency: process.env.AGENCY_SERVICE_URL ?? 'http://localhost:4107',
  notification: process.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:4108',
} as const;
