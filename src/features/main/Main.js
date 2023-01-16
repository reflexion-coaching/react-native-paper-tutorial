import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ThemeSwitch from '../theme/SwitchPaper'
import ButtonPaper from '../button/ButtonPaper'
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
                    screenOptions={{
                        header: (props) => <Header {... props} />
                    }}>
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