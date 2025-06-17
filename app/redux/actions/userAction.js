export const setUserData = (data) => ({
  type: "SET_USER_DATA",
  payload: data,
});

export const updateUserData = (data) => ({
  type: "UPDATE_USER_DATA",
  payload: data,
});

export const clearUserData = () => ({
  type: "CLEAR_USER_DATA",
});
