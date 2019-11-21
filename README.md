Readme.md

# Group Project
|  |  |
| ----------- | ----------- |
| Program Name | Blockchain Development T175 Fall 2019 |
| Course | Full Stack Development III CRN-10555-201901 |

# Group Information
| Student ID | Name |
| ----------- | ----------- |
| 100191710 | Andrew Starling |
| 101198063 | Shilpa Kaushik | 
| 101260567 | Mohammad Jamshed Qureshi |

# Requirements
1. Firebase 
2. NodeJS

# Configuration
Firebase Configuration must be created or updated under src/private/firebase/FirebaseConfig.js.
1. Copy  src/templates/firebase/FirebaseConfig.js to src/private/firebase/FirebaseConfig.js
1. Update configuration

Example Firebase configuration file:
```javascript
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
```

# Running
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in 
the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

# Cloning This Repo
1. `cd` into this directory
1. Run `npm install`
1. Setup Firebase Configuration parameters (see above)
1. Run `npm start`
1. Go into `src/App.js` to do the project
