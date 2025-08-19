
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import type { AuthUser } from "../redux/features/auth/auth.types";
import { loginUser, logoutUser } from "../redux/features/auth/auth.slice";
import { auth, googleProvider } from "../config/firebase/config";

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const loginEmail = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const u: AuthUser = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    };
    dispatch(loginUser(u));
    localStorage.setItem("user", JSON.stringify(u));
  };

  const registerEmail = async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const u: AuthUser = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    };
    dispatch(loginUser(u));
    localStorage.setItem("user", JSON.stringify(u));
  };

  const loginGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    const u: AuthUser = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    };
    dispatch(loginUser(u));
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    localStorage.removeItem("user");
  };

  return {
    user,
    loginEmail,
    registerEmail,
    loginGoogle,
    logout,
  };
};
