import { SimpleAdmin, SimpleRole } from '@/types/entity';
import { ApplicationResponse } from '../application-response';

export interface AuthUserData {
  adminId?: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: number;
  permissions?: SimpleRole[];
  createdBy?: SimpleAdmin | null;
  createdAt: string;
  updatedAt: string;
}

export type AuthUserResponse = ApplicationResponse<AuthUserData>;
