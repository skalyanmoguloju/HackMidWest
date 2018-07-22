import React from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { ScrollView, TouchableOpacity,  } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Routine from '../Routine/Routine';
import Workout from '../Workout/Workout';

import { Header } from 'react-native-elements';

const HeaderMenu = (props) => <Header
    leftComponent={{ icon: 'menu', color: '#fff', onPress:props.navigation.openDrawer }}
    centerComponent={{ text: 'App Title', style: { color: '#fff' } }}
/>

class TitleComponent extends React.Component {
  render() {
    return (
      <ScrollView>
        <Card>
          <CardImage
            source={{uri: 'https://thumbs.dreamstime.com/z/fitness-guide-text-gym-fitness-relative-image-creative-vector-typography-poster-concept-letters-dumbbell-icons-body-building-81900320.jpg'}}
            title=""
          />
        </Card>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate("Workout")}}>
            <Card>
              <CardImage
                source={require('../../images/start_a_workout.jpg')}
                title="Start a Workout"
              />
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate("Routine")}}>
            <Card>
             <CardImage
                source={require('../../images/manage_routines_edited.jpg')}
                title="Manage Routines"
              />
            </Card>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}

const Title = createStackNavigator({
    Home: {
        navigationOptions: {
            header: HeaderMenu,
        },
        screen : TitleComponent,
    },
    Routine: {
        screen: Routine
    },
    Workout: {
        screen: Workout
    }
});

export default Title;