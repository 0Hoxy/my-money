import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { fireauth } from "../firebase/config";

export const useLogin = () => {
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);


  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //유저 로그인
      const res = await fireauth.signInWithEmailAndPassword(email, password);
      //로그인 액션 디스패치
      dispatch({ type: 'LOGIN', payload: res.user });
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  return { login, error, isPending };
};