import { APP_API } from '../config';
import { UserData } from '../types/fetch-data.type';
import { UpdateUserDto } from '../types/request.dto';
import { requestAPI } from './request';

class UsersService {
  async getCurrent(): Promise<UserData> {
    return await requestAPI.get<UserData>(APP_API.currentUser);
  }
  // async loginFacebook() {
  //   // login with facebook then authenticate with the API to get a JWT auth token
  //   // @ts-ignore
  //   const { authResponse } = await new Promise(window.FB.login);

  //   if (!authResponse) return;

  //   const response = await requestAPI.post(`/auth/facebook/redirect`, {
  //     accessToken: authResponse.accessToken,
  //   });

  //   console.log(response);
  // }

  async apiAuthenticate(accessToken: string) {
    const response = requestAPI.post(`/auth/facebook/redirect`, {
      accessToken,
    });

    console.log(response);

    // const account = response.data;

    // accountSubject.next(account);

    // startAuthenticateTimer();

    return response;
  }

  async loginFacebook() {
    // @ts-ignore
    const { authResponse } = await new Promise(window.FB.login);

    console.log(authResponse);

    if (!authResponse) return;

    const response = requestAPI.post(`/auth/facebook/redirect`, {
      authResponse: authResponse.accessToken,
    });

    console.log(response);

    // console.log(response);
  }

  logout() {}

  logoutFacebook() {
    // @ts-ignore
    window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());
  }

  async update(updateUserDto: UpdateUserDto) {
    return await requestAPI.patch(APP_API.user, updateUserDto);
  }

  async updateAvatar(file: File) {
    const formData = new FormData();

    formData.append('image', file);

    return await requestAPI.patch(APP_API.userAvatar, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const usersService = new UsersService();
