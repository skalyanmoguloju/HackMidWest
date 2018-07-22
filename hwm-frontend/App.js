import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Header } from 'react-native-elements';
import Home from './Components/Home/Home';
import Routine from './Components/Routine/Routine';
import Workout from './Components/Workout/Workout';
import Title from './Components/Title/Title';
import Profile from './Components/Profile/Profile';
import Trainer from './Components/Trainer/Trainer';


const App = createDrawerNavigator({
    Home: {
        screen: Title,
    },
    Profile: {
        screen: Profile,
    },
    Routines: {
        screen: Routine,
    },
    Workouts: {
        screen: Workout,
    },
    Trainer: {
        screen: Trainer,
    },

});



export default App;

