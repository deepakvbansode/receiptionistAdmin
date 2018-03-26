// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB7Mrt6fRGQfOqeeT9ixyNKs7UUC-Gt6DU",
    authDomain: "visitor-firestore-app.firebaseapp.com",
    databaseURL: "https://visitor-firestore-app.firebaseio.com",
    projectId: "visitor-firestore-app",
    storageBucket: "visitor-firestore-app.appspot.com",
    messagingSenderId: "868105676792"
  }
};
