import React from 'react';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import {StyleSheet, ScrollView, Button, Picker} from 'react-native';
import {Text, FormInput} from 'react-native-elements';
import PickerSelect from 'react-native-picker-select';
import Excercise from '../Routine/Exercise';

class RoutineComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routines: [],
            exercises: [],
        }
        // this.onAddSet= this.addSet}
        // this.onAddTime={this.addTime}
        // this.onAddExercise={this.addExersise}
        // this.onRemoveSet={this.removeSet}
        // this.onRemoveTime={this.removeTime}
        // this.onRemoveExercise={this.removeExercise}
        // this.onUpdateExercise={this.updateExcercise}
    }

    static navigationOptions = {
        title: 'Add Routine',
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
        exercises.push({
            ...exercise,
            sets: exercise.movementType === 'repetitions' ? [this.onAddSet(0)] : undefined,
            times: exercise.movementType !== 'repetitions' ? [this.onAddSet(0)] : undefined,
        });

        this.setState({exercises});
    };

    render() {
        return (
            <ScrollView>
                <Text h4>Name</Text>
                <FormInput
                />
                <Text h4>Description</Text>
                <FormInput
                    multiline={true}
                />
                <Text h4>Exercises</Text>
                {/*{this.state.exercises.map((exercise, index) => <Excercise*/}
                    {/*index={index}*/}
                    {/*onAddSet={this.addSet}*/}
                    {/*onAddTime={this.addTime}*/}
                    {/*onAddExcercise={this.addExersise}*/}
                    {/*onRemoveSet={this.removeSet}*/}
                    {/*onRemoveTime={this.removeTime}*/}
                    {/*onRemoveExercise={this.removeExercise}*/}
                    {/*onUpdateExercise={this.updateExcercise}*/}
                {/*/>)}*/}
                <Excercise/>
            </ScrollView>
        );
    }
}

export default RoutineComponent;

