const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null,
  };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      default:
        return state;
    }
  }
  