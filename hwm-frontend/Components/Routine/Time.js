import React from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { StyleSheet, View, Button, Picker } from 'react-native';
import {Text, FormInput } from 'react-native-elements';
import PickerSelect from 'react-native-picker-select';
import { Col, Row, Grid } from "react-native-easy-grid";


class Time extends React.Component {
    render() {
        return (
            <View>
                <Grid>
                    <Col>
                        <Text style={{paddingLeft:10}}>Minutes</Text>
                        <FormInput
                            keyboardType="number-pad"
                            value={this.props.minutes.toString()}
                            onChangeText={(value) => this.props.onUpdateMinutes(value)}
                        />
                    </Col>
                    <Col>
                        <Text style={{paddingLeft:10}}>Seconds</Text>
                        <FormInput
                            keyboardType="number-pad"
                            value={this.props.seconds.toString()}
                            onChangeText={(value) => this.props.onUpdateSeconds(value)}
                        />
                    </Col>
                </Grid>
            </View>
        );
    }
}

export default Time;

