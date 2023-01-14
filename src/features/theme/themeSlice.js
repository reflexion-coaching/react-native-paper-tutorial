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
  name: 'counter',
  initialState: lightTheme,
  reducers: {
    switchTheme: (state, action) => {
      if (action.payload === 'light') {
        // console.log('light theme : labelLarge', current(state.fonts.labelLarge))
        return lightTheme
      } else {
        console.log('dark theme : labelLarge', current(state))
        return darkTheme
      }
    },
  }
})

export const { switchTheme } = themeSlice.actions

export default themeSlice.reducer