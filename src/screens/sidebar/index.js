import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";
import { Localization } from 'expo-localization';
import i18n from 'i18n-js';
import {en, es} from "./translations"
i18n.defaultLocale = 'es';
i18n.fallbacks = true;
i18n.translations = { es, en };
i18n.locale = Localization.locale;

const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/logo-camiyaqui.png");
const datas = [
  {
    name: i18n.t('home'),
    route: "Home",
    icon: "home",
    bg: "#C5F442"
  },
   {
   name: i18n.t('rsvp'),
   route: "Rsvp",
   icon: "reply-all"
   },
   {
   name: i18n.t('news'),
   route: "News",
   icon: "comments"
   },
  {
    name: i18n.t('location'),
    route: "Location",
    icon: "gift"
  },
  {
    name: i18n.t('profile'),
    route: "Profile",
    icon: "user"
  },
  {
    name: i18n.t('contact'),
    route: "Contact",
    icon: "envelope"
  },
  {
    name: i18n.t('guests'),
    route: "Guests",
    icon: "users"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image square style={styles.drawerImage} source={drawerImage} />

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    type="FontAwesome"
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
