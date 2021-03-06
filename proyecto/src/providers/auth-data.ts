import { Injectable  } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class AuthData {

    fireAuth: any;

    constructor (public afAuth: AngularFireAuth) {

        afAuth.authState.subscribe( user => {
            if (user) {
                this.fireAuth = user;
                console.log(user);
            }
        });

    }

    loginUser (newEmail: string, newPassword: string): firebase.Promise<any> {

        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);

    }

    loginWithGithub () {
        var provider = new firebase.auth.GithubAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }

    resetPassword (email: string): firebase.Promise<any> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser(): firebase.Promise<any> {
        return this.afAuth.auth.signOut();
    }

    signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
        return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
    }

    updateUserNombre(nombre: string): firebase.Promise<any> {

        let user = firebase.auth().currentUser;
        return user.updateProfile({
            displayName: nombre,
            photoURL: ''
        });

    }

    removeCurrentUser() {

        let user = firebase.auth().currentUser;

        return user.delete();

    }

}
