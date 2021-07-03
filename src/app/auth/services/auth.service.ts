import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  async login(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      return error;
    }
  }

  async register(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
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
