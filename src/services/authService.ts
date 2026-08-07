import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import { auth } from "../firebase/firebase";

export interface SignupRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

class AuthService {

  async signup(data: SignupRequest): Promise<UserCredential> {

    return await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

  }

  async login(data: LoginRequest): Promise<UserCredential> {

    return await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

  }

  async logout(): Promise<void> {

    await signOut(auth);

  }

  getCurrentUser() {

    return auth.currentUser;

  }

}

export default new AuthService();