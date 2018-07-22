import React from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { StyleSheet, Text, ScrollView, View, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import EditRoutine from './EditRoutine';

import { Header, Icon } from 'react-native-elements';



const HeaderMenu = (props) => <Header
    leftComponent={{ icon: 'menu', color: '#fff', onPress:props.navigation.openDrawer }}
    centerComponent={{ text: 'Routines', style: { color: '#fff' } }}
    rightComponent={
        <Icon
            name="add"
            color="#fff"
            onPress={() => {props.navigation.navigate("AddRoutine")}}
        />}
/>

class RoutineComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routines: [],
        }
    }
    componentDidMount() {
        return fetch('http://18.220.11.7:3000/api/routines?filter={"where":{"ownerId":"5b539e78468e507057a12dcd"}}')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    routines: responseJson,
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    };

    render() {
        return (
            <ScrollView>
                {this.state.routines.map((routine) => (
                    <TouchableOpacity key={routine.id} onPress={() => this.props.navigation.navigate("AddRoutine", {routine: routine, title: routine.name})}>
                        <Card key={routine.id}>
                            <CardTitle
                                title={routine.name}
                                subtitle={routine.description}
                            />
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }
}



const Routine = createStackNavigator({
    Home: {
        navigationOptions: {
            header: HeaderMenu,
        },
        screen : RoutineComponent,
    },
    AddRoutine: {
      screen: EditRoutine,
    },

});

export default Routine;

