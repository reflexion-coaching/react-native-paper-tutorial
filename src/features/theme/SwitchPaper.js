import { useState } from 'react';
import { Switch } from 'react-native-paper';
import { useDispatch } from 'react-redux'
import { switchTheme } from './themeSlice'

const ThemeSwitch = () => {

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const dispatch = useDispatch()

    const onToggleSwitch = () => {

        setIsSwitchOn(!isSwitchOn)
        
        if (isSwitchOn) {
            dispatch(switchTheme('light'))
        } else {
            dispatch(switchTheme('dark'))
        }
    }
    return (
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
    );
};

export default ThemeSwitch;