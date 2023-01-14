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

    const theme = useSelector(state => state.theme)

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