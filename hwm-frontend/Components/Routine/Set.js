import React from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { StyleSheet, View, Button, Picker } from 'react-native';
import {Text, FormInput } from 'react-native-elements';
import PickerSelect from 'react-native-picker-select';
import { Col, Row, Grid } from "react-native-easy-grid";


class Set extends React.Component {
    render() {
        return (
            <View>
                <Grid>
                    <Col>
                        <Text style={{paddingLeft:10}}>Reps</Text>
                        <FormInput
                            keyboardType="number-pad"
                            value={this.props.reps.toString()}
                            onChangeText={(value) => this.props.onUpdateReps(value)}
                        />
                    </Col>
                    <Col>
                        <Text style={{paddingLeft:10}}>Weight</Text>
                        <FormInput
                            value={this.props.weight.toString()}
                            keyboardType="number-pad"
                            onChangeText={(value) => this.props.onUpdateWeight(value)}
                        />
                    </Col>
                </Grid>
            </View>
        );
    }
}

export default Set;

