const initialState = {
  savedContent: [],
  postToUnsave: null
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
    case 'TOGGLE_UNSAVING':
      return {
        ...state,
        postToUnsave: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
