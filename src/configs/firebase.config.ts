const env = process.env.REACT_APP_ENV || 'dev'

const config: any = {
  dev: {
    apiKey: 'AIzaSyCL9ZEwG4Y9ix5Z7NfOi3NV2lLDZCzxArQ',
    authDomain: 'dev-cloudkeeper.firebaseapp.com',
    databaseURL: 'https://dev-cloudkeeper.firebaseio.com',
    projectId: 'dev-cloudkeeper',
    storageBucket: 'dev-cloudkeeper.appspot.com',
    messagingSenderId: '933322308523',
  },
  prod: {
    apiKey: 'AIzaSyAhj_Z9ZXDV75a06iA870nHwVAyzi2jb7E',
    authDomain: 'prod-cloudkeeper.firebaseapp.com',
    databaseURL: 'https://prod-cloudkeeper.firebaseio.com',
    projectId: 'prod-cloudkeeper',
    storageBucket: 'prod-cloudkeeper.appspot.com',
    messagingSenderId: '1087824029815',
  },
}


export const getFirebaseConfig = () => config[env]
