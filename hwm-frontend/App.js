import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Header } from 'react-native-elements';
import Home from './Components/Home/Home';


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
        screen: Home,
    },
    Routines: {
        screen: Home,
    },
    Workouts: {
        screen: Home,
    },
    Trainer: {
        screen: Home,
    },

});



export default App;

