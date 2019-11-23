/*
 firebase.js - Firebase Config

 */
import app from 'firebase/app';

// Import Firebase Auth API
import 'firebase/auth';

/******************************************************************************
 * Firebase Class
 * - provides methods mapped to firebase apis
 * - All application components must use this class methods
 *   to interact with Firebase.
 *
 ******************************************************************************/
class Firebase {

    // Constructor
    constructor(config) {
        app.initializeApp(config);

        // Instantiate Authentication Package
        this.auth = app.auth();
    }

    /*******************************************
        Methods - Authentication apis
     *******************************************/

    // New User Registration
    doRegisterUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    // User Login
    doUserLoginWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // User Logout
    doUserLogout = () => this.auth.signOut();

    // User Password Management
    // Password Reset
    doUserPasswordResetWithEmail = email => this.auth.sendPasswordResetEmail(email);

    // Password Update
    doUserPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // Insert Document
    doAddDocument = () => {

        alert('Adding document...')
    }

}

export default Firebase;
