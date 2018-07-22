import React from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { StyleSheet, Text, ScrollView, Button, FlatList, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Header, Icon, Rating } from 'react-native-elements';
import MapView from 'react-native-maps';
import { openMap } from 'react-native-open-map';
import StarRating from 'react-native-star-rating';


const HeaderMenu = (props) => <Header
  leftComponent={{ icon: 'menu', color: '#fff', onPress: props.navigation.openDrawer }}
  centerComponent={{ text: 'Trainer', style: { color: '#fff' } }}
/>

class TrainerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      latitude: 0,
      longitude: 0,
      selectedPlace: {},
      isHidden: true,
    }

    this.findGyms = this.findGyms.bind(this);
    this.showDetailMenu = this.showDetailMenu.bind(this); 
    this.renderDetailMenu = this.renderDetailMenu.bind(this);
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }
    );
  }

  findGyms = () => {
    return fetch('https://api.foursquare.com/v2/venues/explore?ll=' + this.state.latitude + ',' + this.state.longitude + '&query=gym&client_id=SRORFR3CHMAKXPPCIF5XD2KEZJXAPYCS4D0CH3TZ4WFQ50N2&client_secret=1FUFIB113VVEDYVTZENGIA3I0ON2ZIRR2QEQ3V1IL5PAFH4F&v=20180722')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          places: responseJson.response.groups[0].items,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  showDetailMenu = (place) => {
    var selectedPlace = Object.assign({}, this.state.selectedPlace);
    selectedPlace.name = place.venue.name;
    selectedPlace.rating = place.venue.rating / 2;
    selectedPlace.latitude = place.venue.location.lat;
    selectedPlace.longitude = place.venue.location.lng;
    selectedPlace.distance = place.venue.location.distance;
    this.setState({ selectedPlace });
    this.setState({ isHidden: false });
    console.log(selectedPlace.rating);
  }

  renderDetailMenu = () => {
    if (this.state.isHidden)
    {
      return null;
    }  
    return (<Card
      title='ffs' style={styles.detail}>
      <Text style={{ fontSize: 20 }}>
        {this.state.selectedPlace.name}
      </Text>
      <Text style={{ fontSize: 15 , paddingVertical: 10}}>
        {this.state.selectedPlace.distance} meters
      </Text>
      <StarRating
        disabled={true}
        maxStars={5}
        rating={this.state.selectedPlace.rating}
        selectedStar={(rating) => { }}
        fullStarColor={'#f1cb03'}
        halfStarColor={'#f1cb03'}
      />
      <Button
        icon={<Icon name='code' color='#ffffff' />}
        backgroundColor='#03A9F4'
        fontFamily='Lato'
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='Open in Apple Map'
        onPress={e => openMap({
          latitude: this.state.selectedPlace.latitude,
          longitude: this.state.selectedPlace.longitude,
        })} />
    </Card>);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          onPress={this.findGyms}
          title="Find a Nearby Gym"
        />
        <MapView style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
          }}
        >
          <MapView.Marker
            ref={marker => { this.marker = marker }}
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
          />
          {this.state.places.map(
            place => <MapView.Marker
              key={place.venue.id}
              coordinate={{
                latitude: place.venue.location.lat,
                longitude: place.venue.location.lng
              }}
              title={place.venue.name}
              onPress={e => this.showDetailMenu(place)}
            >
            </MapView.Marker>
          )}
        </MapView>
          {this.renderDetailMenu()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center'
  },
  button: {
    position: 'absolute',
    top: 0,
    marginBottom: 20,
  },
  map: {
    position: 'absolute',
    top: 50,
    left: 50,
    right: 50,
    height: 300,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginBottom: 20

  },
  detail: {
    position: 'absolute',
    padding: 20,
    top: 370,
    left: 30,
    right: 30,
    alignItems: 'center'
  }
});

const Routine = createStackNavigator({
  Trainer: {
    navigationOptions: {
      header: HeaderMenu,
    },
    screen: TrainerComponent,
  }
});

export default Routine;