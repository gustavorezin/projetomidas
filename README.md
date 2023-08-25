# MANUAL DO PROJETO

**npx create-expo-app -t expo-template-blank-typescript**

quando fazer instalação com expo, parar o app

### Babel

1. npm i --save-dev babel-plugin-module-resolver;
2. configurar babel.config.js (plugins);
3. substituir tsconfig.json;

### Substituir "splash" (imagem ao abrir o app)

1. ./assets/splash.png
2. configurar app.json

### Fonte do projeto

[Expo](https://docs.expo.dev/develop/user-interface/fonts/#use-a-google-font);

1. npx expo install expo-font @expo-google-fonts/roboto;
2. importar no App.tsx;

### Styled components

- npm i styled-components
