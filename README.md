# MANUAL DO PROJETO

- _**npx create-expo-app -t expo-template-blank-typescript**_
- _quando fazer instalação com expo, parar o app_

## Babel

1. npm i --save-dev babel-plugin-module-resolver;
2. configurar babel.config.js (plugins);
3. substituir tsconfig.json;

## Substituir "splash" (imagem ao abrir o app)

1. ./assets/splash.png
2. configurar app.json

## Fonte do projeto

- [Fontes expo](https://docs.expo.dev/develop/user-interface/fonts/#use-a-google-font);

1. npx expo install expo-font @expo-google-fonts/roboto;
2. importar no App.tsx;

## Styled components

- npm i styled-components

## React Navigation

- [React Navigation](https://reactnavigation.org/docs/getting-started)

1. npm install @react-navigation/native
2. npx expo install react-native-screens react-native-safe-area-context

### Drawer

1. npm install @react-navigation/drawer
2. npx expo install react-native-gesture-handler react-native-reanimated

- colocar plugin no babel.config.js
- fazer importação gesture-handler no App.tsx

## Phosphor icons

- npm install --save phosphor-react-native

## React Hook Form

1. npm i react-hook-form
2. npm i @hookform/resolvers yup

## Axios

- npm i axios

## Toast

- [Toast Message](https://www.npmjs.com/package/react-native-toast-message)
- npm install --save react-native-toast-message

## Async Storage

- [Async Storage Expo](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- npx expo install @react-native-async-storage/async-storage
