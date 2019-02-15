import React from 'react';
import {ScrollView, View, Image, StyleSheet} from 'react-native';

const gallery = [
  {
    "src": "http://edyintan.com/medias/wide1.jpg",
    "thumbnail": "http://edyintan.com/medias/wide1.jpg",
    "w": 859,
    "h": 573,
    "title": "Image 1",
    "class": "wide"
  },
  {
    "src": "http://edyintan.com/medias/wide2.jpg",
    "thumbnail": "http://edyintan.com/medias/wide2.jpg",
    "w": 859,
    "h": 573,
    "title": "Image 2",
    "class": "wide"
  },
  {
    "src": "http://edyintan.com/medias/wide3.jpg",
    "thumbnail": "http://edyintan.com/medias/wide3.jpg",
    "w": 859,
    "h": 573,
    "title": "Image 3",
    "class": "wide"
  },
  {
    "src": "http://edyintan.com/medias/wide4.jpg",
    "thumbnail": "http://edyintan.com/medias/wide4.jpg",
    "w": 859,
    "h": 573,
    "title": "Image 4",
    "class": "wide"
  },
  {
    "src": "http://edyintan.com/medias/wide5.jpg",
    "thumbnail": "http://edyintan.com/medias/wide5.jpg",
    "w": 859,
    "h": 573,
    "title": "Image 5",
    "class": "wide"
  },
  {
    "src": "http://edyintan.com/medias/wide6.jpg",
    "thumbnail": "http://edyintan.com/medias/wide6.jpg",
    "w": 859,
    "h": 573,
    "title": "Image 6",
    "class": "wide"
  },
  {
    "src": "http://edyintan.com/medias/pot1.jpg",
    "thumbnail": "http://edyintan.com/medias/pot1.jpg",
    "w": 573,
    "h": 858,
    "title": "Image 7",
    "class": "wide"
  },
  {
    "src": "http://edyintan.com/medias/pot2.jpg",
    "thumbnail": "http://edyintan.com/medias/pot2.jpg",
    "w": 573,
    "h": 858,
    "title": "Image 8",
    "class": "wide"
  },
  {
    "src": "http://edyintan.com/medias/pot3.jpg",
    "thumbnail": "http://edyintan.com/medias/pot3.jpg",
    "w": 573,
    "h": 858,
    "title": "Image 9",
    "class": "wide"
  },
  {
    "src": "http://edyintan.com/medias/pot4.jpg",
    "thumbnail": "http://edyintan.com/medias/pot4.jpg",
    "w": 573,
    "h": 858,
    "title": "Image 10",
    "class": "wide"
  }
]

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.galleryContainer}>
          {gallery.map((img, index) => {
            return (
              <View key={index} style={styles.item}>
                <Image source={{uri: img.src}} style={styles.itemImg}>
                </Image>
              </View>
            )
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  galleryContainer: {
    paddingTop: 0,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16
  },
  item: {
    width: '50%',
    flexBasis: '50%',
    padding: 4

  },
  itemImg: {
    height: 200
  },
});
