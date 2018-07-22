import React from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Header, Avatar, FormInput} from 'react-native-elements';
import {Col, Row, Grid} from 'react-native-easy-grid';

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

    this.retrieveProfileData = this.retrieveProfileData.bind(this);
    this.retrieveUserData = this.retrieveUserData.bind(this);
    this.createAvatarTextForUsername = this.createAvatarTextForUsername.bind(this);
    this.getFeetComponentForHeight = this.getFeetComponentForHeight.bind(this);
    this.getInchesComponentForHeight = this.getInchesComponentForHeight.bind(this);
    this.getWeightDisplay = this.getWeightDisplay.bind(this);
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
        this.retrieveProfileData().then((profileData) => {
          this.setState({
            user: responseJson,
            profile: profileData
          });
        });
      })
      .catch((error) => {
        console.error(error)
      });
  }

  componentDidMount() {
    return this.retrieveUserData();
  }

  createAvatarTextForUsername() {
    if (!this.state.user || !this.state.user.name) {
      return "";
    }

    const nameTokens = this.state.user.name.split(" ");
    return nameTokens[0].charAt(0) + nameTokens[1].charAt(0);
  }

  getFeetComponentForHeight() {
    if (!this.state.profile || !this.state.profile.biometrics) {
     return "";
    }

    const heightInInches = this.state.profile.biometrics.heightInInches;
    return heightInInches ? Math.trunc(heightInInches / 12).toString() : "";
  }

  getInchesComponentForHeight() {
    if (!this.state.profile || !this.state.profile.biometrics) {
      return "";
    }

    const heightInInches = this.state.profile.biometrics.heightInInches;
    return heightInInches ? (heightInInches % 12).toString() : "";
  }

  getWeightDisplay() {
    if (!this.state.profile || !this.state.profile.biometrics) {
      return "";
    }

    const weightInPounds = this.state.profile.biometrics.weightInPounds;
    return weightInPounds ? weightInPounds.toString() : "";
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{
          flex: 2,
          paddingBottom: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Avatar
            large
            rounded
            title={this.createAvatarTextForUsername()}
          />
          <Text>{this.state.user.name}</Text>
          <Text>{this.state.user.email}</Text>
        </View>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold'
        }}>
          Biometrics
        </Text>
        <View>
          <Grid>
            <Row>
              <Text>Height</Text>
            </Row>
            <Row>
              <Col size={25}>
                <FormInput
                  keyboardType="number-pad"
                  value={this.getFeetComponentForHeight()}
                />
              </Col>
              <Col size={15}>
                <Text>feet</Text>
              </Col>
              <Col size={25}>
                <FormInput
                  value={this.getInchesComponentForHeight()}
                  keyboardType="number-pad"
                />
              </Col>
              <Col size={15}>
                <Text>inches</Text>
              </Col>
              <Col size={20}>
              </Col>
            </Row>
            <Row>
              <Text>Weight</Text>
            </Row>
            <Row>
              <Col size={25}>
                <FormInput
                  value={this.getWeightDisplay()}
                  keyboardType="number-pad"
                />
              </Col>
              <Col size={15}>
                <Text>lbs</Text>
              </Col>
              <Col size={60}>
              </Col>
            </Row>
          </Grid>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 25,
    paddingHorizontal: 10
  }
});

const Profile = createStackNavigator({
  Home: {
    navigationOptions: {
      header: HeaderMenu,
    },
    screen: ProfileComponent,
  },
});

export default Profile;