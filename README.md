# Ionic Angular - My Photo Library application

## Description
I created an application that uses localStorage to save favorite photos, ensuring that we have persistent storage. I made an effort to create descriptive commit messages that show how I proceeded in the development of the application.

Over the past three years, I have primarily worked with React-Native. While I have five years of experience with Angular and two years with Ionic, I haven't worked with these technologies in a while. I am familiar with deploying apps to production via both [play.google.com](http://play.google.com/) and the app store, but I did not have time to create applications and production builds as a part of this task. As a result, there are currently no testing applications available on playstore or testflight in appstore. Nevertheless, I tried my best to make progress.

## Development Steps
### Step 1
- `npm install -g @ionic/cli`
- `ionic start my-photo-library blank --capacitor` → choose Angular
- `cd my-photo-library`

### Step 2
- Change capacitor config appId in `capacitor.config.ts`
- `npx cap add android`
- `npx cap open android`
- Run the app and test if it works in emulator
- `npx cap add ios`
- `npx cam open ios`
- Run the app and test if it works in ios
- `npm install @capacitor/assets`
- create `assets` folder in root folder
- add icon.png and splash.png to the folder
- `npx capacitor-assets generate`

### Step 3
- `ionic generate page pages/photos`
- `ionic generate page pages/favorites`
- `ionic generate page pages/detail`
- `ionic generate service services/photos`
- `ionic generate service services/favorites`
- `ionic generate component components/page-header`
- Add page header to app component

### Step 4
- Tslint - eslint configuration, add aliases

### Step 5
- Implement photo and favorites services, add imageUrl to environment

### Step 6
- Implement photos page with infinite scroll

### Step 7
- Implement favorites and detail page

### Step 8
- Add tests

### Step 9
- Add example pipelines
