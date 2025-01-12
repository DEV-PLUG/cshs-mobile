const LOGIN = 'app/LOGIN' as const;
const LOGOUT = 'app/LOGOUT' as const;
const CHANGE_USER_TYPE = 'app/CHANGE_USER_TYPE' as const;
const NOTIFICATION = 'app/NOTIFICATION' as const;
const LOADING = 'app/LOADING' as const;
const ADD_MESSAGE = 'app/ADD_MESSAGE' as const;
const SET_MESSAGE = 'app/SET_MESSAGE' as const;
const CHANGE_LANGUAGE = 'app/CHANGE_LANGUAGE' as const;

export const login = () => ({
  type: LOGIN
});

export const logout = () => ({
  type: LOGOUT
});

export const setLoading = (type: boolean) => ({
  type: LOADING,
  payload: type
});

type AppAction =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof setLoading>

type AppState = {
  isLogined: boolean;
  isLoading: boolean;
};

const initialState: AppState = {
  isLogined: false,
  isLoading: false,
};

function app(
  state: AppState = initialState,
  action: AppAction
): AppState {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogined: true };
    case LOGOUT:
      return { ...state, isLogined: false };
    case LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export default app;