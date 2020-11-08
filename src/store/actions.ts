import axios from 'axios';
import {
  IUserInfo,
  ISavedContent,
  IPostCardProps
} from '../interfaces/interfaces';
import { Dispatch } from 'redux';
import { UnsaveState } from '../constants/enums';
import {
  TOGGLE_FILTER_CHIP,
  SET_USER_UNSAVING,
  SET_SAVED_CONTENT,
  SET_SUBREDDITS,
  LOGOUT,
  LOGIN
} from './actionTypes';

export const setSavedContent = (savedContent: ISavedContent) => {
  return { type: SET_SAVED_CONTENT, payload: savedContent };
};

export const setUserSubreddits = <ISavedContent extends []>(
  savedContent: ISavedContent
) => {
  const subredditSet = new Set<string>();
  savedContent.forEach((sub: any) => subredditSet.add(sub.subreddit));
  const subredditSetFormatted = [...subredditSet].map((subreddit: any) => ({
    subreddit,
    isDisplayed: true
  }));
  return {
    type: SET_SUBREDDITS,
    payload: subredditSetFormatted
  };
};

export const setUserLoggedOut = () => ({ type: LOGOUT });
const setUserLoggedIn = (username: string) => ({
  type: LOGIN,
  payload: username
});
const setUserUnsaving = (id: string | null, unsaveState: UnsaveState) => ({
  type: SET_USER_UNSAVING,
  payload: { id, unsaveState }
});

export const login = (code: string): any => {
  return async (dispatch: Dispatch): Promise<IUserInfo> => {
    try {
      const { data } = await axios.post('/api/login', { code });
      console.log('data from action ', data);
      localStorage.setItem('accessToken', data.content.accessToken);
      dispatch(setSavedContent(data.content.postCardData));
      dispatch(setUserSubreddits(data.content.postCardData));
      dispatch(setUserLoggedIn(data.content.username));
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
      dispatch(setUserSubreddits(data.content.postCardData));
      dispatch(setUserLoggedIn(data.content.username));
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
      const newSavedContent = getState().dashboard.savedContent.filter(
        (elem: IPostCardProps) => elem.postId !== id
      );
      dispatch(setSavedContent(newSavedContent));
      dispatch(setUserUnsaving(id, UnsaveState.SUCCESS));
      console.log('data from unsaving', data);

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

export const filterUserPostCards = (subreddit: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    const subredditsToToggle = getState().dashboard.savedContent.map(
      (elem: IPostCardProps) => {
        if (elem.subreddit === subreddit) {
          elem.isDisplayed = !elem.isDisplayed;
        }
        return elem;
      }
    );
    dispatch(setSavedContent(subredditsToToggle));
    dispatch(toggleFilterChip(subreddit));
  };
};

export const toggleFilterChip = (subreddit: string) => {
  return { type: TOGGLE_FILTER_CHIP, payload: subreddit };
};
