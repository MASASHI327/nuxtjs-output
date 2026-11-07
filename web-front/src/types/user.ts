export type UserType = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponseType = {
  user: UserType;
  accessToken: string;
  code: number;
};
