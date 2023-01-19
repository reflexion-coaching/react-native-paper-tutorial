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
                    <Tab.Screen name="Theme" component={ThemeScreen} options={{
                        tabBarLabel: 'Theme',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }} />
                    <Tab.Screen name="Calendar" component={CalendarScreen} options={{
                        tabBarLabel: 'Calendar',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="calendar" color={color} size={26} />
                        ),
                    }} />
                </Tab.Navigator>

            </NavigationContainer>
        </PaperProvider>

    );
}

export default Main;