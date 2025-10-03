import { TokenResponse, UserResponse } from '@/api/iam/models/iam';

export const TOKEN_RESPONSE: TokenResponse = {
  status: 'success',
  access_token: 'access_token_test',
  refresh_token: 'refresh_token_test',
};

export const TEST_USER: UserResponse & { password: string } = {
  id: 'test-id-1',
  email: 'testuser@example.com',
  password: 'TestUser@123',
  first_name: 'Test',
  last_name: 'User',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
