import axios from 'axios';
import {
  IUserInfo,
  ISavedContent,
  IUnsavePayload,
  IPostCardProps
} from '../interfaces/interfaces';
import { Dispatch } from 'redux';

export const setSavedContent = (savedContent: ISavedContent) => {
  return { type: 'SET_SAVED_CONTENT', payload: savedContent };
};

const setUserLoggedIn = () => ({ type: 'LOGIN' });
const setUserLoggedOut = () => ({ type: 'LOGOUT' });
const toggleUserUnsaving = (id: string | null) => ({
  type: 'TOGGLE_UNSAVING',
  payload: id
});

export const login = (code: string): any => {
  return async (dispatch: Dispatch): Promise<IUserInfo> => {
    try {
      const { data } = await axios.post('/api/login', { code });
      console.log('data from action ', data);
      dispatch(setSavedContent(data.content.postCardData));
      localStorage.setItem('accessToken', data.content.accessToken);
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

export const unsaveContent = (id: string) => {
  return async (dispatch: Dispatch, getState: any): Promise<object> => {
    try {
      dispatch(toggleUserUnsaving(id));
      const accessToken = localStorage.getItem('accessToken');
      const { data } = await axios.post('/api/unsaveContent', {
        id,
        accessToken
      });
      const newSavedContent = getState().user.savedContent.filter(
        (elem: IPostCardProps) => elem.postId !== id
      );
      dispatch(setSavedContent(newSavedContent));

      return data.content;
    } catch (err) {
      setTimeout(() => {
        dispatch(toggleUserUnsaving(null));
      }, 2000);
      return err;
    }
  };
};
