import React, { useReducer } from 'react';
import { AuthContext } from './context';

const isBrowser = typeof window !== 'undefined';
const INITIAL_STATE = {
  isAuthenticated: isBrowser && !!localStorage.getItem('username'),
  username: isBrowser && localStorage.getItem('username'),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERNAME_SUCCESS':
      localStorage.setItem('username', `${action.payload}`);
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload
      };
    default:
      return state;
  }
}

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
