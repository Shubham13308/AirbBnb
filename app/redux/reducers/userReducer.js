const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        user: action.payload || null,
      };

    case "UPDATE_USER_DATA":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case "CLEAR_USER_DATA":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
