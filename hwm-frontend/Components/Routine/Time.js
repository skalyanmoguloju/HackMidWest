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
                        <Text>Minutes</Text>
                        <FormInput
                            keyboardType="number-pad"
                        />
                    </Col>
                    <Col>
                        <Text>Seconds</Text>
                        <FormInput
                            keyboardType="number-pad"
                        />
                    </Col>
                </Grid>
            </View>
        );
    }
}

export default Time;

