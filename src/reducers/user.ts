const initialState = {
  savedContent: [],
  postToUnsave: { id: null, unsaveState: null }
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SAVED_CONTENT':
      return {
        ...state,
        savedContent: action.payload
      };
    case 'SET_USERNAME':
      return {
        ...state
      };
    case 'SET_USER_UNSAVING':
      if (
        action.payload.unsaveState === 'success' ||
        action.payload.unsaveState === 'reset'
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
