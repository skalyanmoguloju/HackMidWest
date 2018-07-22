import React from 'react';
import {StyleSheet, ScrollView, Button, View, Alert} from 'react-native';
import {Text, FormInput} from 'react-native-elements';
import PickerSelect from 'react-native-picker-select';
import { Footer, FooterTab} from 'native-base';
import Exercise from '../Routine/Exercise';

class RoutineComponent extends React.Component {
    constructor(props) {
        super(props);

        this.buildExercise = this.buildExercise.bind(this);

        if(this.props && this.props.navigation.state.params && this.props.navigation.state.params.routine) {
            const {routine} = this.props.navigation.state.params;
            this.state = {
                exercises: routine.exerciseList.map(exercise => this.buildExercise(exercise)),
                name: routine.name,
                description: routine.description,
                id: routine.id,
            };
        }
        else
        {
            this.state = {
                exercises: [],
                name: '',
                description: '',
                id: undefined,
            };
        }

        this.onAddSet = this.onAddSet.bind(this);
        this.onAddTime = this.onAddTime.bind(this);
        this.onAddExercise = this.onAddExercise.bind(this);
        this.onUpdateExercise = this.onUpdateExercise.bind(this);
        this.onUpdateSet = this.onUpdateSet.bind(this);
        this.onUpdateTime=this.onUpdateTime.bind(this);
        this.onRemoveExercise = this.onRemoveExercise.bind(this);
        this.onRemoveSet = this.onRemoveSet.bind(this);
        this.onRemoveTime = this.onRemoveTime.bind(this);
        this.onSaveRoutine = this.onSaveRoutine.bind(this);
        this.buildSets = this.buildSets.bind(this);
    }

    static navigationOptions = {
        title: 'Add Routine',
    };

    buildExercise = (exercise) => {
        if(exercise && exercise.sets)
        {
            if(parseInt(exercise.sets[0].weight) > 0 ) {
                return ({
                    id: exercise.id,
                    sets: exercise.sets.map(set => ({
                        reps: parseInt(set.reps),
                        weight: parseInt(set.weight)
                    }))
                });
            } else {
                return ({
                    id: exercise.id,
                    times: exercise.sets.map(set => ({
                        minutes: parseInt(set.durationMinutes),
                        seconds: parseInt(set.durationSeconds)
                    }))
                });
            }
        }
        else {
            return {};
        }
    };

    buildSets = (exercise) => {
        const set = {
            reps: 0,
            weight: 0,
            weightUnit: 'lbs',
            durationMinutes: 0,
            durationSeconds: 0,
        };

        let sets =[];
        if (exercise.times !== undefined && exercise.times.length > 0) {
            sets = exercise.times.map((time, index) => ({
                ...set,
                sequence: index+1,
                durationMinutes: parseInt(time.minutes),
                durationSeconds: parseInt(time.seconds),
            }))
        }
        else if(exercise.sets !== undefined) {
            sets = exercise.sets.map((setValue, index) => ({
                ...set,
                sequence: index+1,
                weight: parseInt(setValue.weight),
                reps: parseInt(setValue.reps),
            }))
        }
        return sets;
    }

    onSaveRoutine = () => {
        const routine = {
            name: this.state.name,
            description: this.state.description,
            ownerId: '5b539e78468e507057a12dcd',
            visibility: 'public',
            id: this.state.id,
            exerciseList: this.state.exercises.map(exercise => ({
                id: exercise.id,
                sets: this.buildSets(exercise),
            }))
        }

        return fetch('http://18.220.11.7:3000/api/routines', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(routine),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(
                    'Successful'
                )

            })
            .catch((error) => {
                console.error(error);
            });
    };


    onAddSet = (index) => {
        const {exercises} = this.state;

        exercises[index].sets.push({reps: 0, weight: 0});

        this.setState({exercises});
     };

     onAddTime = (index) => {
         const {exercises} = this.state;

         exercises[index].times.push({minutes: 0, seconds: 0});

         this.setState({exercises});
     };

    onAddExercise = (exercise) => {
        const {exercises} = this.state;
        exercises.push({});

        this.setState({exercises});
    };

    onUpdateExercise = (index, exercise) => {
        const {exercises} = this.state;
        exercises[index] = {
            ...exercise,
            sets: exercise && exercise.movementType === 'repetitions' ? [{reps: 0, weight: 0}] : undefined,
            times: exercise && exercise.movementType !== 'repetitions' ? [{minutes: 0, seconds: 0}] : undefined,
        };

        this.setState({exercises});
    };

    onUpdateSet = (index,setIndex, reps, weight) => {
        const {exercises} = this.state;
        const exercise = exercises[index];

        exercise.sets[setIndex] = {reps, weight}
        exercises[index] = exercise;
        this.setState({exercises});
    };

    onUpdateTime = (index,timeIndex, minutes, seconds) => {
        const {exercises} = this.state;
        const exercise = exercises[index];

        exercise.times[timeIndex] = {minutes, seconds}
        exercises[index] = exercise;
        this.setState({exercises});
    };

    onRemoveExercise = (index) => {
        const {exercises} = this.state;
        exercises.splice(index, 1);
        this.setState({exercises});
    };

    onRemoveSet = (index, setIndex) => {
        const {exercises} = this.state;
        const exercise = exercises[index];
        exercise.splice(setIndex, 1);
        exercises[index] = exercise;
        this.setState({exercises});
    };

    onRemoveTime = (index, timeIndex) => {
        const {exercises} = this.state;
        const exercise = exercises[index];
        exercise.splice(timeIndex, 1);
        exercises[index] = exercise;
        this.setState({exercises});
    };


    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <Text h4 style={{paddingLeft:10}}>Name</Text>
                    <FormInput
                        value={this.state.name}
                        onChangeText={(value) => this.setState({name: value})}
                    />
                    <Text h4 style={{paddingLeft:10}}>Description</Text>
                    <FormInput
                        value={this.state.description}
                        multiline={true}
                        onChangeText={(value) => this.setState({description: value})}
                    />
                    <Text h4 style={{paddingLeft:10}}>Exercises</Text>
                    {this.state.exercises.map((exercise, index) => <Exercise
                        index={index}
                        key={index}
                        onAddSet={this.onAddSet}
                        onAddTime={this.onAddTime}
                        onRemoveSet={this.onRemoveExercise}
                        onRemoveTime={this.onRemoveTime}
                        onRemoveExercise={this.onRemoveExercise}
                        onUpdateExercise={this.onUpdateExercise}
                        onUpdateTime={this.onUpdateTime}
                        onUpdateSet={this.onUpdateSet}
                        exercise={exercise}
                    />)}
                    <Button
                        onPress={this.onAddExercise}
                        title="Add Exercise"
                        color="#841584"
                    />
                </ScrollView>
                <View>
                    <Footer>
                        <FooterTab>
                            <Button
                                title="Save"
                                onPress={this.onSaveRoutine}
                            />

                            <Button
                                title="Cancel"
                            />
                        </FooterTab>
                    </Footer>
                </View>
            </View>

        );
    }
}

export default RoutineComponent;

