import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  async loginGoogle(): Promise<any> {
    try {
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      return error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      return error;
    }
  }

  async sendEmailVerification(): Promise<void> {
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }

  async login(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      return error;
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.sendEmailVerification();
      return result;
    } catch (error) {
      return error;
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      return error;
    }
  }

  async getCurrentUser() {
    try {
      return this.afAuth.authState.pipe(first()).toPromise();
    } catch (error) {
      return error;
    }
  }
}
