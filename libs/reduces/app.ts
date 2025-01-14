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

export const changeUserType = (type: "employer" | "laborer" | string) => ({
  type: CHANGE_USER_TYPE,
  payload: type
});

interface notification {
  type: "error" | "success" | "warning";
  text: string;
}
export const notification = (value: notification) => ({
  type: NOTIFICATION,
  payload: value
});

type AppAction =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof changeUserType>
  | ReturnType<typeof notification>

type AppState = {
  isLogined: boolean;
  isLoading: boolean;
  userType: "student" | "teacher" | string;
  notification: { type: "error" | "success" | "warning", text: string } | null;
};

const initialState: AppState = {
  isLogined: false,
  isLoading: false,
  userType: "student",
  notification: null,
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
    case CHANGE_USER_TYPE:
      return { ...state, userType: action.payload };
    case NOTIFICATION:
      return { ...state, notification: { type: action.payload.type, text: action.payload.text } };
    default:
      return state;
  }
}

export default app;