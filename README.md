# Tutoriel : React Native Paper

**EN COURS**

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

### Redux ToolKit

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
  name: 'theme',
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

React Native Paper autorise les développeurs à modifier la polive d'écriture. Le lien vers la documentation sur la police d'écriture est : https://callstack.github.io/react-native-paper/fonts.html

La documentation officielle préconise l'utilisation de la fonction `configureFonts` afin de modifier la police d'un niveau d'écriture. Paper sépare les polices en plusieurs niveaux d'écriture : *labelLarge, bodySmall, titleSmall, ...*. Cependant, il semblerait que Redux ne supporte pas cette fonction car cette dernière casse la règle d'immutabilité chère à Redux (https://daveceddia.com/react-redux-immutability-guide/). J'ai posé la question sur stackoverflow (https://stackoverflow.com/questions/75112911/react-native-paper-redux-toolkit-redux-doesnt-track-change-in-fonts-between) mais actuellement, personne n'y a répondu. 

Pour modifier la police d'un de nos deux thèmes, nous allons utiliser l'opérateur **... spread**. L'utilisation de cette opérateur est d'ailleurs très bien documenté dans l'article sur l'immutabilité de Redux. Le code de `themeSlice.js` devient :

```
import { createSlice, current } from '@reduxjs/toolkit'
import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';

const lightTheme = {
  ...MD3LightTheme,
};

const darkTheme = {
  ...MD3DarkTheme,
  myOwnProperty: true,
  fonts: {
    ...MD3DarkTheme.fonts,
    "labelLarge": {
      fontFamily: "System",
      letterSpacing: 0.5,
      fontWeight: "500",
      lineHeight: 16,
      fontSize: 11
    }
  }
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: lightTheme,
  reducers: {
    switchTheme: (state, action) => {
      if (action.payload === 'light') {
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

Super ! Le code fonctionne : la taille du label *Press me* est plus petite avec le dark theme que le light theme. 

## React Navigation 

Pour contrôler la navigation à travers l'application, React Native Paper recommande l'utilisation de la librairie React Navigation. La documentation propose deux tutoriels d'explications. Adaptons les deux à notre exemple.

### Theming with React Navigation

Le lien vers ce tutoriel est : https://callstack.github.io/react-native-paper/theming-with-react-navigation.html

L'objectif est de combiner React Paper et Navigation pour offrir une application navigable avec plusieurs thèmes :) 

Commençons par installer les librairies nécessaires : 

```
$ npx expo install react-native-screens react-native-safe-area-context

$ npm install @react-navigation/native

$ npm install @react-navigation/stack
```

A la fois React Navigation et Paper proposent des utilitaires pour changer les thèmes de l'application. Pour que les thèmes soient aux normes de Material Design 3, nous allons utiliser `adaptNavigationTheme` de React Navigation pour adapter les thèmes de navigation à ceux de Paper. 

Commençons par créer un dossier `src/screens` qui contiendra le code de nos différents écrans :

```
$ mkdir src/screens

$ touch src/screens/HomeScreen.js

$ touch src/screens/DetailsScreens.js
```

`HomeScreen.js` contiendra simplement :

```
import { TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';

const title = "Titre 1"

const content = "Content of Card 1"

const HomeScreen = ({ navigation }) => (
    <TouchableOpacity
      onPress={() =>
        navigation?.push('Details', {
          title,
          content,
        })
      }
    >
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{title}</Text>
          <Text variant="bodyMedium">{content}</Text>
        </Card.Content>
      </Card>
      
    </TouchableOpacity>
  );

export default HomeScreen;
```

`DetailsScreen.js` héritera du titre et du contenu passé dans le navigateur :

```
import { List } from 'react-native-paper'

const DetailsScreen = (props) => {
    const { title, content } = props?.route?.params;
    return (
        <List.Section>
            <List.Subheader>{title}</List.Subheader>
            <List.Item title={content} />
        </List.Section>
    );
};

export default DetailsScreen;
```

Dans le fichier `Main.js`, commentons ce que nous avons fait jusqu'ici et enveloppons l'application dans le navigateur :

```
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ThemeSwitch from '../theme/SwitchPaper'
import ButtonPaper from '../button/ButtonPaper'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import DetailsScreen from '../../screens/DetailsScreens';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Stack = createStackNavigator();

function Main() {

    const theme = useSelector(state => state.theme)

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
            {/*
            <View style={{...styles.container, backgroundColor: theme.colors.background}}>
                <ButtonPaper />
                <ThemeSwitch />
            </View>
            */}
        </PaperProvider>

    );
}

export default Main;
```

La navigation est maintenant mise en place :) Nous allons maintenant combiner les thèmes de React Navigation et Paper. La documentation propose l'utilisation de la libraire `deepmerge` afin de combiner les thèmes des deux librairies. Etant donné les difficultés précédentes avec l'immutabilité, je propose que nous utilisons à nouveau l'opérateur **`... spread`**. 

Modifions d'abord `themeSlice.js` :

```
import { createSlice } from '@reduxjs/toolkit'
import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const lightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
  myOwnProperty: true,
  fonts: {
    ...MD3DarkTheme.fonts,
    "labelLarge": {
      fontFamily: "System",
      letterSpacing: 0.5,
      fontWeight: "500",
      lineHeight: 16,
      fontSize: 11
    }
  }
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: lightTheme,
  reducers: {
    switchTheme: (state, action) => {
      if (action.payload === 'light') {
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

Super : les deux thèmes de React Navigation et Paper sont combinés en utilisant du pur JavaScript. Bien créons un dossier et un fichier `src/header/Header.js`

```
$ mkdir src/header

$ touch src/header/Header.js
```

et écrivons le code pour une jolie `Appbar` :

```
import { Appbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import ThemeSwitch from '../features/theme/SwitchPaper';

const Header = ({ navigation, back }) => {
    const route = useRoute();
    const theme = useSelector(state => state.theme)
    return (
        <Appbar.Header
            theme={{
                colors: {
                    primary: theme?.colors.surface,
                },
            }}
        >
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={route.name} />
            <ThemeSwitch />
        </Appbar.Header>
    );
};

export default Header;
```

Parfait ! Il ne reste plus qu'à importer le composant dans `Main.js` :

```
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import DetailsScreen from '../../screens/DetailsScreens';
import Header from '../../header/Header';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Stack = createStackNavigator();

function Main() {

    const theme = useSelector(state => state.theme)

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <Stack.Navigator 
                    initialRouteName="Home"
                    screenOptions=
                    { 
                      {
                        header: (props) => <Header {... props} />
                      } 
                    }>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>

    );
}

export default Main;
```

Excellent !! Le code fonctionne à merveille :)

**Nous avons maintenant une application navigable avec des thèmes customizables à souhait et qui respecte les conseils de design de Material Design 3 !**

## Customiser une librairie

Chouette tutoriel : https://blog.logrocket.com/create-customized-shareable-calendars-react-native/

Le problème avec Material Design est que toutes les librairies n'utilisent pas ce standard. Voyons comment utiliser une libraire étrangère et la styliser avec Paper. Nous allons utiliser la librairie **react-native-calendars** (https://github.com/wix/react-native-calendars ). L'installation se fait comme suit :

```
$ npm install react-native-calendars
```

Bien maintenant, ajoutons un Tab menu à notre application. L'état actuel de l'application sera enveloppée dans l'onglet **Theming** tandis que le calendrier sera dans le menu **Calendar** :

```
$ npm install @react-navigation/material-bottom-tabs

$ npm install MaterialCommunityIcons

$ npm install material-bottom-tab
```

Ensuite créons un petit composant `src/screens/CalendarScreen.js` :

```
import {View, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
)

function CalendarScreen() {
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
        </View>
    )
}

export default CalendarScreen;
```

Ensuite, modifions le fichier `Main.js` :

```
import { Provider as PaperProvider } from 'react-native-paper';
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ThemeScreen from '../../screens/ThemingScreens';
import CalendarScreen from '../../screens/CalendarScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

function Main() {

    const theme = useSelector(state => state.theme)

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <Tab.Navigator initialRouteName="Theme">
                    <Tab.Screen name="Theme" component={ThemeScreen} options={ {
                        tabBarLabel: 'Theme',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    } } />
                    <Tab.Screen name="Calendar" component={CalendarScreen} options={ {
                        tabBarLabel: 'Calendar',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="calendar" color={color} size={26} />
                        ),
                    } } />
                </Tab.Navigator>

            </NavigationContainer>
        </PaperProvider>

    );
}

export default Main;
```

Bien ! Les menus de navigation imbriqués fonctionnent :) Créons un nouveau composant `src/features/calendar/Calendar.js` qui contiendra le code du calendrier :

```
$ mkdir src/features/calendar

$ touch src/features/calendar/Calendar.js
```

et passons-y le code suivant :

```
import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    }
}
)

function CalendarComponent() {
    return (
        <View style={styles.container}>
            <Calendar
                // Initially visible month. Default = Date()

                // Handler which gets executed on day press. Default = undefined
                onDayPress={day => {
                    console.log('selected day', day);
                } }
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MMMM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={month => {
                    console.log('month changed', month);
                } }
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
            />
        </View>
    )
}

export default CalendarComponent;
```

`CalendarScreen.js` devient :

```
import CalendarComponent from "../features/calendar/Calendar";

function CalendarScreen() {
    return (
        <CalendarComponent />
    )
}

export default CalendarScreen;
```

Maintenant, changeons les **prop** `theme` (et si besoin, `style`) du calendrier en lui appliquant les valeurs de `theme` passé par dans le store Redux.

```
import { SafeAreaView } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useSelector } from 'react-redux'


function CalendarComponent() {

    const theme = useSelector(state => state.theme)

    return (
        <SafeAreaView>
            <Calendar
                // needed to re-render when theme changed
                key={theme.dark}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={day => {
                    console.log('selected day', day);
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MMMM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                theme={{
                    calendarBackground: theme.colors.background,
                    dayTextColor: theme.colors.text,
                    textDisabledColor: theme.colors.text,
                    monthTextColor: theme.colors.text,
                    arrowColor: theme.colors.tertiary,
                    todayTextColor: theme.colors.error,
                  }}
            />
        </SafeAreaView>
    )
}

export default CalendarComponent;
```

Problème avec le thème : https://github.com/wix/react-native-calendars/issues/982#issuecomment-582526267 & https://github.com/wix/react-native-calendars/issues/1209

Une liste des options pour le theme est disponible ici : https://github.com/wix/react-native-calendars/blob/master/src/types.ts

Le format des dates est bien expliqué dans ce tutoriel : http://arshaw.com/xdate/#Formatting

