import React from 'react';
import { StyleSheet, ScrollView, Button, Picker } from 'react-native';
import {Text, FormInput, Icon } from 'react-native-elements';
import PickerSelect from 'react-native-picker-select';
import Set from '../Routine/Set';
import Time from '../Routine/Time';
import { Col, Row, Grid } from "react-native-easy-grid";

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

class Exercise extends React.Component {
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
        if(this.props.exercise.id!==selectValue) {
            const ex = this.state.exercises.filter(exercise => exercise.id === selectValue);
            this.props.onUpdateExercise(this.props.index, ex[0])
        }
    };

    render() {
        return (
            <ScrollView>
                <Grid>
                    <Col>
                        <Text>Exercise</Text>
                        <PickerSelect
                            value={this.props.exercise.id}
                            items={this.getExercises()}
                            onValueChange={this.onSelectionChange}
                            style={{ ...pickerSelectStyles }}
                        />
                    </Col>
                    <Col style={{ width: 40, paddingTop: 25 }}>
                        <Icon
                            name="delete"
                            color="red"
                            onPress={() => {this.props.onRemoveExercise(this.props.index)}}
                        />}
                    </Col>
                </Grid>
                {this.props.exercise.sets &&
                this.props.exercise.sets.map((set, index) => (
                    <Set
                        key={index}
                        index={index}
                        reps={set.reps}
                        weight={set.weight}
                        onUpdateReps={(reps) => this.props.onUpdateSet(this.props.index,index, reps, set.weight)}
                        onUpdateWeight={(weight) => this.props.onUpdateSet(this.props.index,index, set.reps, weight)}
                    />
                ))
                }
                {this.props.exercise.times &&
                this.props.exercise.times.map((time, index) => (
                    <Time
                        key={index}
                        index={index}
                        minutes={time.minutes}
                        seconds={time.seconds}
                        onUpdateMinutes={(minutes) => this.props.onUpdateTime(this.props.index,index, minutes, time.seconds)}
                        onUpdateSeconds={(seconds) => this.props.onUpdateTime(this.props.index,index, time.minutes, seconds)}
                    />
                ))
                }

                {this.props.exercise.times &&
                    <Button title="Add Sets" onPress={() => this.props.onAddTime(this.props.index)}/>
                }

                {this.props.exercise.sets &&
                <Button title="Add Sets" onPress={() => this.props.onAddSet(this.props.index)}/>
                }
            </ScrollView>
        );
    }
}

export default Exercise;

