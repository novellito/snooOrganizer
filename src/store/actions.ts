import axios from 'axios';
import { IUserInfo } from '../interfaces/interfaces';
import { Dispatch } from 'redux';

const setSavedContent = (savedContent: any) => {
  return { type: 'SET_SAVED_CONTENT', payload: savedContent };
};
const setUserLoggedIn = () => ({ type: 'LOGIN' });

export const fetchUserContent = (code: any): any => {
  return async (dispatch: Dispatch): Promise<IUserInfo> => {
    try {
      const { data } = await axios.post('/api/userContent', { code });
      console.log('data from action ', data);
      dispatch(setSavedContent(data.content.postCardData));
      dispatch(setUserLoggedIn());
      return data.content;
    } catch (err) {
      return err;
    }
  };
};
