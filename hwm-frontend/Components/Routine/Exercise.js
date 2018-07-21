import React from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { StyleSheet, ScrollView, Button, Picker } from 'react-native';
import {Text, FormInput } from 'react-native-elements';
import PickerSelect from 'react-native-picker-select';
import Set from '../Routine/Set';
import Time from '../Routine/Time';

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

class Excercise extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            exercises: [],
            isSetVisible: false,
            isTimeVisible: false,
        };

        this.getExercises = this.getExercises.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
    }
    componentDidMount() {
        return fetch('http://18.220.11.7:3000/api/exercises')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    exercises: responseJson,
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    };

    getExercises = () => {
        return this.state.exercises.map(exercise => ({
            label: exercise.name,
            value: exercise.id,
        }));
    };

    onSelectionChange = (selectValue) => {
        const ex = this.state.exercises.filter(exercise => exercise.id === selectValue);
        console.log(ex.movementType);
        if(ex[0].movementType === 'repetitions') {
            console.log("ajfla");
            this.setState({
                isSetVisible: true,
                isTimeVisible: false,
            });
        }
        else {
            console.log("dvjytjnyg");

            this.setState({
                isSetVisible: false,
                isTimeVisible: true,
            });
        }
        //this.props.onUpdateExercise(this.props.index)
    };

    render() {
        return (
            <ScrollView>
                <Text>Exercise</Text>
                <PickerSelect
                    items={this.getExercises()}
                    onValueChange={this.onSelectionChange}
                    style={{ ...pickerSelectStyles }}
                />
                {this.state.isSetVisible &&
                    <Set />
                }
                {this.state.isTimeVisible &&
                    <Time />
                }
            </ScrollView>
        );
    }
}

export default Excercise;

