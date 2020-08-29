import axios from 'axios';
import {
  IUserInfo,
  ISavedContent,
  IPostCardProps
} from '../interfaces/interfaces';
import { Dispatch } from 'redux';
import { UnsaveState } from '../constants/enums';

export const setSavedContent = (savedContent: ISavedContent) => {
  return { type: 'SET_SAVED_CONTENT', payload: savedContent };
};

const setUserLoggedIn = () => ({ type: 'LOGIN' });
const setUserLoggedOut = () => ({ type: 'LOGOUT' });
const setUserUnsaving = (id: string | null, unsaveState: UnsaveState) => ({
  type: 'SET_USER_UNSAVING',
  payload: { id, unsaveState }
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
      dispatch(setUserUnsaving(id, UnsaveState.UNSAVING));
      const accessToken = localStorage.getItem('accessToken');
      const { data } = await axios.post('/api/unsaveContent', {
        id,
        accessToken
      });
      const newSavedContent = getState().user.savedContent.filter(
        (elem: IPostCardProps) => elem.postId !== id
      );
      dispatch(setSavedContent(newSavedContent));
      dispatch(setUserUnsaving(id, UnsaveState.SUCCESS));

      return data.content;
    } catch (err) {
      setTimeout(() => {
        dispatch(setUserUnsaving(id, UnsaveState.ERROR));
      }, 2000);
      setTimeout(() => {
        dispatch(setUserUnsaving(id, UnsaveState.RESET));
      }, 3500);
      return err;
    }
  };
};
