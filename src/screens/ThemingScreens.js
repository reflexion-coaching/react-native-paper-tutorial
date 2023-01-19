import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreens';
import Header from '../header/Header';

function ThemeScreen() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                header: (props) => <Header {...props} />
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    )
}

export default ThemeScreen;