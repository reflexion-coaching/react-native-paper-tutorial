import { Calendar } from 'react-native-calendars'
import { useSelector } from 'react-redux'


function CalendarComponent() {

    const theme = useSelector(state => state.theme)

    return (
        <Calendar
            // needed to re-render when theme changed
            key={theme.dark}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
                alert("Date selected " + day.dateString);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MMMM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
                console.log('month changed', month);
            }}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            theme={{
                calendarBackground: theme.colors.background,
                dayTextColor: theme.colors.text,
                textDisabledColor: theme.colors.text,
                monthTextColor: theme.colors.text,
                arrowColor: theme.colors.tertiary,
                todayTextColor: theme.colors.error,
            }}
        />
    )
}

export default CalendarComponent;