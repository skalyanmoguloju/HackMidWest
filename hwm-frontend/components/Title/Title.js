import React from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { ScrollView, TouchableOpacity,  } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Routine from '../Routine/Routine';

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
        <Card>
          <CardImage
            source={{uri: 'https://c2.staticflickr.com/4/3839/14211483907_9fd780b734_b.jpg'}}
            title="Start a Workout"
          />
        </Card>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate("Routine")}}>
            <Card>
             <CardImage
                source={{uri: 'https://www.publicdomainpictures.net/pictures/220000/velka/open-blank-notebook-black-amp-white.jpg'}}
                title="Manage Routines"s
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

});

export default Title;