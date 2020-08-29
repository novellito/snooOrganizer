const initialState = {
  savedContent: []
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

    default:
      return state;
  }
};

export default reducer;
