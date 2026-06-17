export interface ChecklistItem {
  id: string;
  category: "Setup" | "Implementation" | "Security" | "Exercises";
  title: string;
  description: string;
  codeSnippet?: string;
  detailedGuide: string;
}

export interface UserFromDB {
  id: string;
  username: string;
  passwordHash: string;
  fullName: string;
  bio: string;
  role: string;
  isEmailConfirmed: boolean;
  createdAt: string;
}

export interface ServerCookieState {
  accessTokenPresent: boolean;
  refreshTokenPresent: boolean;
  access_token_value_preview: string | null;
  refresh_token_value_preview: string | null;
}

export interface ServerActivityLog {
  id: string;
  timestamp: string;
  type: "system" | "auth" | "security" | "token";
  message: string;
  details?: string;
}

export interface SystemState {
  usersCount: number;
  users: UserFromDB[];
  revokedTokensCount: number;
  revokedTokensList: string[];
  logs: ServerActivityLog[];
  currentCookies: ServerCookieState;
}

export interface DecodedJWT {
  header: {
    alg: string;
    typ: string;
  };
  payload: {
    sub: string;
    username: string;
    role: string;
    isEmailConfirmed: boolean;
    iat?: number;
    exp?: number;
  };
  signature: string;
  raw: string;
}
