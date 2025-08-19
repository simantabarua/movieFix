export type AuthUser = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
};

export type AuthState = {
  user: AuthUser | null;
};
