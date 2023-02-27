import { createContext, useContext } from "react";
import { useState } from "react";

const StateContext = createContext({
  CurrentUser: {},
  UserToken: null,
  surveys: [],
  questionTypes: [],
  toast: { message: null, show: false },
  setCurrentUser: () => {},
  setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [CurrentUser, setCurrentUser] = useState({});
  const [UserToken, _setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );
  const [surveys, setsurveys] = useState();
  const [questionTypes] = useState([
    "text",
    "select",
    "radio",
    "checkbox",
    "textarea",
  ]);
  const [toast, settoast] = useState({ message: "", show: false });

  const showToast = (message) => {
    settoast({ message, show: true });
    setTimeout(() => {
      settoast({ message: "", show: false });
    }, 3000);
  };

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
    _setUserToken(token);
  };

  return (
    <StateContext.Provider
      value={{
        CurrentUser,
        setCurrentUser,
        UserToken,
        setUserToken,
        surveys,
        questionTypes,
        toast,
        showToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
