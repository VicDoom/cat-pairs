export type LoginRequestDto = {
  login: string;
  password: string;
};

export type RegistrationFieldDto = {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  login: string;
  password: string;
};

export type LoginOauthDto = {
  code: string;
  redirect_url: string;
};

export type LoginOauthRequestDto = Pick<LoginOauthDto, 'code'>;

export interface DefaultResult {
  reason: string;
}
