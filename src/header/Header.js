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