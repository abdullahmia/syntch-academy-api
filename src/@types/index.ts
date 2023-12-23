export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  photo: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  active: boolean;
}
