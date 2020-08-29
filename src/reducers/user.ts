const initialState = {
  savedContent: [],
  accessToken: ''
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
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
