export interface DataChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface PasswordRequestResult {
  isOk: boolean;
  reason: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export interface AvatarRequestResult {
  isOk: boolean;
  avatar?: string;
  error?: string;
}