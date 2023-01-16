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