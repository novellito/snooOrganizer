import { UnsaveState } from '../constants/enums';

const initialState = {
  savedContent: [],
  originalSavedContent: [],
  postToUnsave: { id: null, unsaveState: null }
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SAVED_CONTENT':
      return {
        ...state,
        savedContent: action.payload,
        originalSavedContent: action.payload
      };
    case 'SET_USERNAME':
      return {
        ...state
      };
    case 'FILTER_CONTENT':
      return {
        ...state,
        savedContent: action.payload
      };
    case 'RESET_FILTER':
      return {
        ...state,
        savedContent: state.savedContent.map((elem: any) => {
          elem.isDisplayed = true;
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
