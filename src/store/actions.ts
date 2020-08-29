import axios from 'axios';
import {
  IUserInfo,
  ISavedContent,
  IUnsavePayload
} from '../interfaces/interfaces';
import { Dispatch } from 'redux';

const setSavedContent = (savedContent: ISavedContent) => {
  return { type: 'SET_SAVED_CONTENT', payload: savedContent };
};

const setAccessToken = (accessToken: string) => {
  return { type: 'SET_ACCESS_TOKEN', payload: accessToken };
};

const setUserLoggedIn = () => ({ type: 'LOGIN' });
const setUserLoggedOut = () => ({ type: 'LOGOUT' });

export const login = (code: string): any => {
  return async (dispatch: Dispatch): Promise<IUserInfo> => {
    try {
      const { data } = await axios.post('/api/login', { code });
      console.log('data from action ', data);
      dispatch(setSavedContent(data.content.postCardData));
      localStorage.setItem('accessToken', data.content.accessToken);
      dispatch(setAccessToken(data.content.accessToken));
      dispatch(setUserLoggedIn());
      return data.content;
    } catch (err) {
      return err;
    }
  };
};

export const fetchUserContent = (): any => {
  return async (dispatch: Dispatch): Promise<IUserInfo> => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const { data } = await axios.post('/api/userContent', { accessToken });
      console.log('data from fetching! ', data);
      dispatch(setSavedContent(data.content.postCardData));
      dispatch(setUserLoggedIn());
      return data.content;
    } catch (err) {
      return err;
    }
  };
};

export const unsaveContent = ({ id, accessToken }: IUnsavePayload) => {
  return async (dispatch: Dispatch): Promise<object> => {
    try {
      const { data } = await axios.post('/api/unsaveContent', {
        id,
        accessToken
      });
      console.log('data from action ', data);
      // dispatch(setSavedContent(data.content.postCardData));

      return data.content;
    } catch (err) {
      return err;
    }
  };
};
