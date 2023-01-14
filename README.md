# Tutoriel : React Native Paper

**EN COURS**

issue : https://github.com/callstack/react-native-paper/issues/2553

https://reactnavigation.org/blog/2020/01/29/using-react-navigation-5-with-react-native-paper/#theming

https://stackoverflow.com/questions/75047740/react-native-paper-theming-fails-to-apply/75102572#75102572

## Installation : React Native



```
$ npx create-expo-app reactNativePaper

$ cd reactNativePaper
```

## Installation : React Native Paper

React Native Paper est une librairie de composants React Native suivant les lignes de conduite de Material Design de Google. 

L'URL vers la documentation est https://callstack.github.io/react-native-paper/index.html

Suivons le guide officiel pour l'installation :

```
$ npm install react-native-paper

$ npm install react-native-safe-area-context
```

Ensuite, modifions le fichier `babel.config.js` :

```
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
```

## Test

Modifions le fichier `Apps.js` et testons le fonctionnement de Paper :

```
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TestButton = () => (
  <Button icon="camera" mode="contained" onPress={() => alert('Pressed')}>
    Press me
  </Button>
);

export default function App() {
  return (
    <View style={styles.container}>
      <TestButton />
    </View>
  );
}
```

Un bouton apparait au milieu de la page :) Il existe plusieurs types de bouton décrits sur la page : https://callstack.github.io/react-native-paper/button.html


## Theme

Paper fournit un Provider comme celui de Redux afin d'envelopper l'application. Des explications détaillées d'installation sont disponibles à la page https://callstack.github.io/react-native-paper/theming.html.

Pour modifier complètement un theme, il suffit de spécifier une liste des couleurs pour chaque détail de Paper :

```
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  "colors": {
    "primary": "rgb(52, 61, 255)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(224, 224, 255)",
    "onPrimaryContainer": "rgb(0, 0, 110)",
    "secondary": "rgb(92, 93, 114)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(225, 224, 249)",
    "onSecondaryContainer": "rgb(25, 26, 44)",
    "tertiary": "rgb(120, 83, 107)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 216, 238)",
    "onTertiaryContainer": "rgb(46, 17, 38)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(27, 27, 31)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(27, 27, 31)",
    "surfaceVariant": "rgb(228, 225, 236)",
    "onSurfaceVariant": "rgb(70, 70, 79)",
    "outline": "rgb(119, 118, 128)",
    "outlineVariant": "rgb(199, 197, 208)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(48, 48, 52)",
    "inverseOnSurface": "rgb(243, 239, 244)",
    "inversePrimary": "rgb(190, 194, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(245, 242, 255)",
      "level2": "rgb(239, 236, 255)",
      "level3": "rgb(233, 230, 255)",
      "level4": "rgb(231, 228, 255)",
      "level5": "rgb(227, 224, 255)"
    },
    "surfaceDisabled": "rgba(27, 27, 31, 0.12)",
    "onSurfaceDisabled": "rgba(27, 27, 31, 0.38)",
    "backdrop": "rgba(48, 48, 56, 0.4)"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TestButton = () => (
  <Button icon="camera" mode="contained" onPress={() => alert('Pressed')}>
    Press me
  </Button>
);

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <TestButton />
      </View>
    </PaperProvider>
  );
}

```

Excellent ! Un bouton normé par Paper apparaît.

## Redux ToolKit

Installons un petit store Redux afin de contrôler le theme général de l'application. L'objectif est de pouvoir switcher entre un light et dark theme.

```
$ npm install @reduxjs/toolkit react-redux

$ mkdir src

$ mkdir src/app

$ mkdir src/features

$ mkdir src/features/main

$ mkdir src/features/theme

$ mkdir src/features/button

$ touch mkdir src/features/main/Main.js

$ touch src/app/store.js

$ touch src/features/theme/themeSlice.js

$ touch src/features/theme/SwitchPaper.js

$ touch src/features/button/ButtonPaper.js
```

Parfait ! Commençons par éditer les fichiers de la sorte :

* `store.js` :

  ```
  import { configureStore } from '@reduxjs/toolkit'
  import themeReducer from '../features/theme/themeSlice'

  export default configureStore({
    reducer: {
      theme: themeReducer
    }
  })
  ```

* `themeSlice.js` :

  ```
import { createSlice, current } from '@reduxjs/toolkit'
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';


const lightTheme = {
  ...MD3LightTheme,
};

const darkTheme = {
  ...MD3DarkTheme,
};

export const themeSlice = createSlice({
  name: 'counter',
  initialState: lightTheme,
  reducers: {
    switchTheme: (state, action) => {
      if (action.payload === 'light'){
        return lightTheme
      } else {
        return darkTheme
      }
    },
  }
})

export const { switchTheme } = themeSlice.actions

export default themeSlice.reducer
  ```

* `SwitchPaper.js` :

  ```
  import { useState } from 'react';
  import { Switch } from 'react-native-paper';
  import { useDispatch } from 'react-redux'
  import { switchTheme } from './themeSlice'


  const ThemeSwitch = () => {

      const [isSwitchOn, setIsSwitchOn] = useState(false);
      const dispatch = useDispatch()

      const onToggleSwitch = () => {

          setIsSwitchOn(!isSwitchOn)
          
          if (isSwitchOn) {
              dispatch(switchTheme('light'))
              console.log('theme : light')
          } else {
              dispatch(switchTheme('dark'))
              console.log('theme : dark')
          }
      }
      return (
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      );
  };

  export default ThemeSwitch;
  ```

* `ButtonPaper.js` :

  ```
  import { View, StyleSheet } from 'react-native'
  import { Button } from 'react-native-paper';

  const styles = StyleSheet.create({
      container: {
          padding: 5,
      },
  });

  const ButtonPaper = () => (
      <View style={styles.container}>
          <Button icon="camera" mode="contained" onPress={() => alert('Pressed')}>
              Press me
          </Button>
      </View>
  );

  export default ButtonPaper;
  ```

* `Main.js` :

  ```
  import { StyleSheet, View } from 'react-native';
  import { Provider as PaperProvider } from 'react-native-paper';
  import ThemeSwitch from '../theme/SwitchPaper'
  import ButtonPaper from '../button/ButtonPaper'
  import { useSelector } from 'react-redux'


  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
      },
  });

  function Main() {

      const theme = useSelector(state => state.theme.theme)

      return (
          <PaperProvider theme={theme}>
              <View style={styles.container}>
                  <ButtonPaper />
                  <ThemeSwitch />
              </View>
          </PaperProvider>

      );
  }

  export default Main;
  ```

* `App.js` :

  ```
  import React from 'react'
  import store from './src/app/store'
  import { Provider } from 'react-redux'
  import Main from './src/features/main/Main'

  export default function App() {

    return (
      <Provider store={store}>
        < Main />
      </Provider>
    );
  }
  ```

Et voilà :) Nous avons un **bouton** et un **switch**. Le switch affiche sert à modifier la valeur du **theme** stockée dans le **store** Redux sous le reducer `themeReducer`. En switchant du theme "light" vers le theme "dark" (et vice-versa), les éléments changent de couleur comme prévu. Seulement pour modifier la couleur du fond, nous devons ajouter une petite ligne au fichier `Main.js` :

```
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ThemeSwitch from '../theme/SwitchPaper'
import ButtonPaper from '../button/ButtonPaper'
import { useSelector } from 'react-redux'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function Main() {

    const theme = useSelector(state => state.theme.theme)

    return (
        <PaperProvider theme={theme}>
            <View style={{...styles.container, backgroundColor: theme.colors.background}}>
                <ButtonPaper />
                <ThemeSwitch />
            </View>
        </PaperProvider>

    );
}

export default Main;
```

Pour le moment, nous devons passer la couleur du theme en fond ... à vérifier avec React Native Paper si cette façon de faire est correcte. 

## Fonts

https://blog.logrocket.com/adding-custom-fonts-react-native/

Redux et l'immutabilité : https://daveceddia.com/react-redux-immutability-guide/#redux-update-an-object