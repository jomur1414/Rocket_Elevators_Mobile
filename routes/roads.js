import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import StartupApplication  from '../screens/StartUpScreen';
import Home from '../screens/HomeScreen';
import ElevatorStatus from '../screens/ElevatorStatusScreen';

const screens = {
    StartUpPage: {
        screen: StartupApplication
    },
    Home: {
        screen: Home
    },
    ElevatorStatus: {
        screen: ElevatorStatus
    }
}

const roads = createStackNavigator(screens);

export default createAppContainer(roads);