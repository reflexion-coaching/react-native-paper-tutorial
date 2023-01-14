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