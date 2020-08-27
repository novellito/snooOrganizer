import axios from 'axios';
import { IUserInfo } from '../interfaces/interfaces';
import { Dispatch } from 'redux';
import snoowrap from 'snoowrap';
const clientCredsAndUserAgent = {
  clientId: '',
  clientSecret: '',
  userAgent: ''
};
const setSavedContent = (savedContent: any) => {
  return { type: 'SET_SAVED_CONTENT', payload: savedContent };
};
const setUserLoggedIn = () => ({ type: 'LOGIN' });
const setSnooObject = (user: any) => ({ type: 'SET_USER', payload: user });

export const fetchUserContent = (code: any): any => {
  return async (dispatch: Dispatch): Promise<any> => {
    // return async (dispatch: Dispatch): Promise<IUserInfo> => {
    try {
      // console.log('code', code);
      // const { data } = await axios.post('/api/userContent', { code });
      // console.log('data from action ', data);
      // dispatch(setSavedContent(data.content));
      // // dispatch(setSavedContent(data.content.savedContent));
      console.log('HERE');
      const { accessToken } = await snoowrap.fromAuthCode({
        code,
        ...clientCredsAndUserAgent,
        redirectUri: 'http://localhost:3000/'
      });
      console.log('RERERER', accessToken);

      // const snoowrapObj = new snoowrap({
      //   ...clientCredsAndUserAgent,
      //   accessToken
      // });

      // let username;
      // const savedContent = await snoowrapObj
      //   .getMe()
      //   .then((user) => {
      //     username = user.name;
      //     return user.getSavedContent();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      // const content = { savedContent, accessToken, username };
      // console.log(content);
      // dispatch(setSnooObject(snoowrapObj));
      // dispatch(setUserLoggedIn());
      return 1;
      // return content;
      // return data.content;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
};
