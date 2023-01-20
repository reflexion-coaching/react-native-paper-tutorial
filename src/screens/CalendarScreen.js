import CalendarComponent from "../features/calendar/Calendar";
import { SafeAreaView, StyleSheet } from 'react-native'
import { autoBatchEnhancer } from "@reduxjs/toolkit";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "auto"
    }
});

function CalendarScreen() {
    return (
        <SafeAreaView> 
        <CalendarComponent />
        </SafeAreaView>
    )
}

export default CalendarScreen;