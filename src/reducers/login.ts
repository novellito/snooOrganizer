const initialState = {
  isLoggedIn: false,
  username: ''
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload
      };
    case 'LOGOUT':
      return initialState;

    default:
      return state;
  }
};

export default reducer;
