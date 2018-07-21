import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome Hack Midwest</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
                <Button
                    onPress={this.props.navigation.openDrawer}
                    title="Learn More"
                    color="#841584"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
