import React from 'react';
import {MapView} from 'expo';
import {Marker} from 'react-native-maps'
import {Button, Container, Footer, FooterTab, Icon} from "native-base";


export default class locationMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: false,
      description: false,
      maptab: true,
    };
  }

  render() {
    return (
      <Container>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: -34.52,
            longitude: -58.60,
            latitudeDelta: 0.11,
            longitudeDelta: 0.38,
          }}
        >
          <Marker
            coordinate={{latitude: -34.472746, longitude: -58.774751}}
            title="Estancia La Linda"
            description="Manuel Luis de Oliden 4651, B1664 Tortuguitas"
          />
          <Marker
            coordinate={{latitude: -34.576873, longitude: -58.432269}}
            title="Salida de las combis"
            description="Ángel Justiniano Carranza 2370"
          />
          <Marker
            coordinate={{latitude: -34.576068, longitude: -58.432552}}
            title="Juntada el viernes"
            description="Av. Santa Fe 5183"
            pinColor={"#0288d1"}
          />
        </MapView>
        <Footer>
          <FooterTab>
            <Button active={this.state.photos} onPress={() => this.props.navigation.navigate("LocationPhoto")}>
              <Icon active={this.state.photos} name="camera"/>
            </Button>
            <Button active={this.state.description} onPress={() => this.props.navigation.navigate("Location")}>
              <Icon active={this.state.description} name="apps"/>
            </Button>
            <Button active={this.state.maptab} onPress={() => this.props.navigation.navigate("LocationMap")}>
              <Icon active={this.state.maptab} name="compass"/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
