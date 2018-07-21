import React from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import EditRoutine from './EditRoutine';

import { Header, Icon } from 'react-native-elements';



const HeaderMenu = (props) => <Header
    leftComponent={{ icon: 'menu', color: '#fff', onPress:props.navigation.openDrawer }}
    centerComponent={{ text: 'Rountines', style: { color: '#fff' } }}
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
        return fetch('http://18.220.11.7:3000/api/routines?filter={"where":{"ownerId":"string"}}')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
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
                    <Card key={routine.id}>
                        <CardTitle
                            title={routine.name}
                            subtitle={routine.description}
                        />
                    </Card>
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

