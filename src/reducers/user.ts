import { UnsaveState, FilterChipAll } from '../constants/enums';

const initialState = {
  savedContent: [],
  userSubreddits: [],
  postToUnsave: { id: null, unsaveState: null },
  selectedSubreddit: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SAVED_CONTENT':
      return {
        ...state,
        savedContent: action.payload
      };
    case 'SET_SUBREDDITS':
      return {
        ...state,
        userSubreddits: action.payload
      };
    case 'IDK':
      if (action.payload === FilterChipAll.SELECT_ALL) {
        return {
          ...state,
          userSubreddits: state.userSubreddits.map((elem: any) => {
            elem.isDisplayed = true;
            return elem;
          })
        };
      } else if (action.payload === FilterChipAll.DESELECT_ALL) {
        return {
          ...state,
          userSubreddits: state.userSubreddits.map((elem: any) => {
            elem.isDisplayed = false;
            return elem;
          })
        };
      } else {
        var clonedArray = JSON.parse(JSON.stringify(state.userSubreddits));

        var foundIndex = state.userSubreddits.findIndex(
          (x) => x.subreddit == action.payload
        );
        clonedArray[foundIndex].isDisplayed = !state.userSubreddits[foundIndex]
          .isDisplayed;

        return {
          ...state,
          userSubreddits: clonedArray
        };
      }
    case 'TOGGLE_ALL':
      return {
        ...state,
        savedContent: state.savedContent.map((elem: any) => {
          elem.isDisplayed = action.payload ? true : false;
          return elem;
        })
      };
    case 'SET_USER_UNSAVING':
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
