import { TripSummary } from './types';

export const demoTrips: TripSummary[] = [
  {
    id: 'trip_001',
    title: 'Lahore Heritage Walk',
    destination: 'Lahore, Pakistan',
    startDate: '2026-05-10',
    endDate: '2026-05-14',
    status: 'active',
    createdBy: 'user_001',
    coverImageUrl: null,
    members: [
      { userId: 'user_001', role: 'owner' },
      { userId: 'user_002', role: 'member' },
    ],
  },
  {
    id: 'trip_002',
    title: 'Hunza Summer Escape',
    destination: 'Hunza Valley, Pakistan',
    startDate: '2026-06-02',
    endDate: '2026-06-08',
    status: 'draft',
    createdBy: 'user_003',
    coverImageUrl: null,
    members: [
      { userId: 'user_003', role: 'owner' },
      { userId: 'user_001', role: 'planner' },
    ],
  },
];
