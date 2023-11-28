const initialState = {
  authToken: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, //copy all previous states
        authToken: action.payload,
        user: action.user
      }
    case 'LOGOUT':
      return {
        authToken: null,
        user: null
      }
    default:
      return state;
  }
}