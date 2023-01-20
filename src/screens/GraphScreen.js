import { SafeAreaView, StyleSheet } from 'react-native'
import LinePlot from "../features/graphs/LinePlotTest"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

function GraphScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <LinePlot />
        </SafeAreaView>
    )
}

export default GraphScreen;