import { UnsaveState, FilterChipAll } from '../constants/enums';
import {
  SET_SAVED_CONTENT,
  SET_SUBREDDITS,
  TOGGLE_FILTER_CHIP,
  TOGGLE_ALL,
  SET_USER_UNSAVING
} from '../store/actionTypes';
import { IDashboardState } from '../interfaces/interfaces';

const initialState: IDashboardState = {
  savedContent: [],
  userSubreddits: [],
  postToUnsave: { id: null, unsaveState: null }
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SAVED_CONTENT:
      return {
        ...state,
        savedContent: action.payload
      };
    case SET_SUBREDDITS:
      return {
        ...state,
        userSubreddits: action.payload
      };
    case TOGGLE_FILTER_CHIP:
      if (action.payload === FilterChipAll.SELECT_ALL) {
        return {
          ...state,
          userSubreddits: state.userSubreddits.map((elem: any) => {
            return { ...elem, isDisplayed: true };
          })
        };
      } else if (action.payload === FilterChipAll.DESELECT_ALL) {
        return {
          ...state,
          userSubreddits: state.userSubreddits.map((elem: any) => {
            return { ...elem, isDisplayed: false };
          })
        };
      } else {
        return {
          ...state,
          userSubreddits: state.userSubreddits.map((elem: any) => {
            if (elem.subreddit === action.payload) {
              return { ...elem, isDisplayed: !elem.isDisplayed };
            }
            return elem;
          })
        };
      }
    case TOGGLE_ALL:
      return {
        ...state,
        savedContent: state.savedContent.map((elem: any) => {
          return { ...elem, isDisplayed: action.payload ? true : false };
        })
      };
    case SET_USER_UNSAVING:
      if (
        action.payload.unsaveState === UnsaveState.SUCCESS ||
        action.payload.unsaveState === UnsaveState.RESET
      ) {
        return {
          ...state,
          postToUnsave: { id: null, unsaveState: null }
        };
      }
      return {
        ...state,
        postToUnsave: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
