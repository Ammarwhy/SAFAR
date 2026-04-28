export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INTERNAL_ERROR';

export interface ApiErrorShape {
  error: {
    code: ApiErrorCode;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface AuthenticatedRequestUser {
  id: string;
  email?: string;
  role?: string;
}

export interface RequestContext {
  user?: AuthenticatedRequestUser;
}

export interface TripMember {
  userId: string;
  role: 'owner' | 'planner' | 'member' | 'viewer';
}

export interface TripSummary {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  createdBy: string;
  coverImageUrl?: string | null;
  members: TripMember[];
}
