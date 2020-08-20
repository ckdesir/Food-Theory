/**
 * The Firebase project configuration of Food Theory
 */
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyA2A9HX4z5gbP0Fxs4_2tXk4Pu6XEUnZHM',
  authDomain: 'food-theory.firebaseapp.com',
  databaseURL: 'https://food-theory.firebaseio.com',
  projectId: 'food-theory',
  storageBucket: 'food-theory.appspot.com',
  messagingSenderId: '986353400595',
  appId: '1:986353400595:web:1047eb005bb0bc2657b8e6',
  measurementId: 'G-Z18H71PQDT',
};

/**
 * The configuration for the UI responsible for sign-ins to the website,
 * dictates providers and basic callbacks.
 * @param {string} signInSuccessUrl - where to redirect once users are signed in
 */
const UI_CONFIG = (signInSuccessUrl) => {
  return {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        const user = authResult.user;
        const credential = authResult.credential;
        const isNewUser = authResult.additionalUserInfo.isNewUser;
        const providerId = authResult.additionalUserInfo.providerId;
        const operationType = authResult.operationType;
        return true;
      },
      uiShown: function () {
        document.getElementById('loader').style.display = 'none';
      },
    },
    signInFlow: 'redirect',
    signInSuccessUrl: signInSuccessUrl,
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: {
          prompt: 'select_account',
        },
      },
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: ['public_profile', 'email'],
        customParameters: {
          auth_type: 'reauthenticate',
        },
      },
      {
        provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      },
    ],
    tosUrl: 'tos.html',
    privacyPolicyUrl: 'pp.html',
  };
};

/**
 * Adds the different sign-in providers to the authentication container
 * @param {String}
 */
const INITALIZE_SIGN_IN = (redirectURL) => {
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', UI_CONFIG(redirectURL));
};

export { FIREBASE_CONFIG, UI_CONFIG, INITALIZE_SIGN_IN };
