import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Header } from 'react-native-elements';
import Home from './Components/Home/Home';
import Routine from './Components/Routine/Routine';
import Profile from './Components/Profile/Profile';
import Trainer from './Components/Trainer/Trainer';

const HeaderMenu = (props) => <Header
    leftComponent={{ icon: 'menu', color: '#fff', onPress:props.navigation.openDrawer }}
    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
/>

const Main = createStackNavigator({
    Home: {
        navigationOptions: {
            header: HeaderMenu,
        },
        screen : Home,
    },
});

const App = createDrawerNavigator({
    Home: {
        screen: Main,
    },
    Profile: {
        screen: Profile,
    },
    Routines: {
        screen: Routine,
    },
    Workouts: {
        screen: Home,
    },
    Trainer: {
        screen: Trainer,
    },

});



export default App;

