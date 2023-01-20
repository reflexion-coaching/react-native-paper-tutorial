import { useSelector } from 'react-redux'
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import GraphTheme from './graphTheme';


function LinePlot() {

    const theme = useSelector(state => state.theme)

    const themeTest = GraphTheme(theme)

    return (
        <VictoryChart
            theme={themeTest}
        >
            <VictoryLine
                data={[
                    { x: 1, y: 2 },
                    { x: 2, y: 3 },
                    { x: 3, y: 5 },
                    { x: 4, y: 4 },
                    { x: 5, y: 7 }
                ]}
            />
        </VictoryChart>
    );
}

export default LinePlot;
