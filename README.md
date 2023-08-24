# MANUAL DO PROJETO

=> npx create-expo-app -t expo-template-blank-typescript

// quando fazer instalação com expo, parar o app

### Babel

- npm i --save-dev babel-plugin-module-resolver;
- configurar babel.config.js (plugins);
- substituir tsconfig.json;

### Substituir "splash" (imagem ao abrir o app)

- ./assets/splash.png
- configurar app.json

### FONTE DO PROJETO

- https://docs.expo.dev/develop/user-interface/fonts/#use-a-google-font;
- npx expo install expo-font @expo-google-fonts/roboto;
- importar no App.tsx;

### Styled components

- npm i styled-components
