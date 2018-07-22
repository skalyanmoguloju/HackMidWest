import React from 'react';
import {ScrollView, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Header} from 'react-native-elements';

const HeaderMenu = (props) => <Header
  leftComponent={{ icon: 'menu', color: '#fff', onPress:props.navigation.openDrawer }}
  centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
/>

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "225b539e78468e507057a12dcd",
      profile: {},
      user: {},
    }

    this.retrieveProfileData = this.retrieveProfileData;
    this.retrieveUserData = this.retrieveUserData;
  }

  retrieveProfileData() {
    return fetch(`http://18.220.11.7:3000/api/profiles/findOne?filter=%7B%22where%22%3A%7B%22userId%22%3A%${this.state.userId}%22%7D%7D`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error)
      });
  }

  retrieveUserData() {
    return fetch(`http://18.220.11.7:3000/api/users/findOne?filter=%7B%22where%22%3A%7B%22id%22%3A%${this.state.userId}%22%7D%7D`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          user: responseJson,
          profile: this.retrieveProfileData(),
        });
      })
      .catch((error) => {
        console.error(error)
      });
  }

  componentDidMount() {
    return this.retrieveUserData();
  }

  render() {
    return (
      <ScrollView>
        <Text>Profile data for {this.state.user.name}</Text>
      </ScrollView>
    );
  }
}

const Profile = createStackNavigator({
  Home: {
    navigationOptions: {
      header: HeaderMenu,
    },
    screen: ProfileComponent,
  },
});

export default Profile;