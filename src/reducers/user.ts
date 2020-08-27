const initialState = {
  savedContent: [],
  currentUser: null
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
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
