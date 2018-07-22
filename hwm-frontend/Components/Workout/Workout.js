import React from 'react';
import { StyleSheet, Text, ScrollView, View, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import { Card, CardTitle } from 'react-native-cards';
import moment from 'moment';
import PickerSelect from 'react-native-picker-select';
import Modal from "react-native-modal";
import AddWorkout from './AddWorkout';

import { Header, Icon } from 'react-native-elements';


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingRight: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
    },
});

const HeaderMenu = (props) => <Header
    leftComponent={{ icon: 'menu', color: '#fff', onPress:props.navigation.openDrawer }}
    centerComponent={{ text: 'Workout', style: { color: '#fff' } }}
/>

class WorkoutComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false,
            routines: [],
            workouts:[],
        };

        this.getRoutinesDropdown = this.getRoutinesDropdown.bind(this);
        this.onModalCancel = this.onModalCancel.bind(this);
        this.onModalSubmit = this.onModalSubmit.bind(this);
        this.getRoutines = this.getRoutines.bind(this);
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    componentDidMount() {
        return fetch('http://18.220.11.7:3000/api/workouts?filter={"where":{"ownerId":"5b539e78468e507057a12dcd"}}')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    workouts: responseJson,
                    // routines: this.getRoutines(),
                },() => this.getRoutines());
            })
            .catch((error) =>{
                console.error(error);
            });
    };

    getRoutines = () => {
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

    getRoutinesDropdown = () => {
        return this.state.routines.map(routine => ({
            label: routine.name,
            value: routine.id,
        }));
    };

    onModalSubmit = () => {
        this._toggleModal();
        if(this.state.routineId)
        {
            this.props.navigation.navigate("AddWorkout", {routineId:this.state.routineId})
        }
    };

    onModalCancel =() => {
        this._toggleModal();
    };

    onSelectionChange = (value) => {
        this.setState({
            routineId: value,
        })
    };

    deleteWorkout = (id) => {
        return fetch(`http://18.220.11.7:3000/api/workouts/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const newWorkOuts = this.state.workouts.filter(workout => workout.id!==id);
                console.log(newWorkOuts);
                this.setState({
                    workOuts: newWorkOuts,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getSwipeBtn = (id) => ([{
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgb(0, 0, 0)',
        onPress: () => {this.deleteWorkout(id)}
    }]);
    render() {
        return (
            <ScrollView>
                <View>
                    <Button title="Add Workout" onPress={this._toggleModal} />
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{backgroundColor: 'grey', height: 100}}>
                            <Text>Exercise</Text>
                            <PickerSelect
                                value={this.state.routineId}
                                items={this.getRoutinesDropdown()}
                                onValueChange={this.onSelectionChange}
                                style={{ ...pickerSelectStyles }}
                            />
                            <Button
                                title="Ok"
                                onPress={this.onModalSubmit}
                            />
                        </View>
                    </Modal>

                    {this.state.workouts.map((workout) => (
                        <TouchableOpacity key={workout.id} onPress={() => this.props.navigation.navigate("AddWorkout", {workout:workout})}>
                            <Swipeout right={this.getSwipeBtn(workout.id)}
                                      backgroundColor= 'transparent'>
                                <TouchableOpacity key={workout.id} onPress={() => this.props.navigation.navigate("AddWorkout", {workout:workout})}>
                                    <Card key={workout.id}>
                                        <CardTitle
                                            title={workout.name}
                                            subtitle={`${moment(workout.startDateTime).format('MM/DD/YYYY HH:mm:A')} - ${moment(workout.startDateTime).format('MM/DD/YYYY HH:mm:A')}`}
                                        />
                                    </Card>
                                </TouchableOpacity>
                            </Swipeout>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        );
    }
}



const Workout = createStackNavigator({
    Home: {
        navigationOptions: {
            header: HeaderMenu,
        },
        screen : WorkoutComponent,
    },
    AddWorkout: {
        screen: AddWorkout,
    },

});

export default Workout;

