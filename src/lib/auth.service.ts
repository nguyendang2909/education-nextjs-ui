import { APP_API } from '../config';
import {
  ChangeForgotPasswordDto,
  ForgotPasswordDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class AuthService {
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return await requestAPI.post<{ email?: string }>(
      APP_API.forgotPassword,
      forgotPasswordDto,
    );
    // await
  }

  async changeForgotPassword(changeForgotPasswordDto: ChangeForgotPasswordDto) {
    return await requestAPI.post(
      APP_API.auth.changeForgotPassword,
      changeForgotPasswordDto,
    );
  }
}

export const authService = new AuthService();
