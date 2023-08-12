import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import Video from 'react-native-video';

const DetailScreen = ({route}) => {
  const data = route.params.item;

  return (
    <View style={{flex: 1}}>
      <ScrollView scrollEnabled nestedScrollEnabled={true} style={{flex: 1,marginHorizontal: 10}}>
        <View>
          <View style={styles.videoContainer}>
            {data.video_url !== null ? (
              <Video
                style={styles.content}
                source={{uri: data.video_url}}
                controls={true}
                playWhenInactive={false}
                resizeMode="cover"
                playInBackground={false} // Store reference
              ></Video>
            ) : (
              <Image
                style={styles.content}
                source={{uri: data.thumbnail_url}}
              />
            )}
          </View>
          <Text style={styles.bytext}>-by {data.credits[0].name}</Text>
          <View style={styles.searchView} />
          <View>
            <Text style={styles.textColor}>{data.description? data.description : 'No description'}</Text>
          </View>
          <View style={styles.separator} />
          <View>
            <Text style={styles.instructorText}>Instruction</Text>
            {data.instructions.map(i => {
              return <Text style={styles.textColor}> - {i.display_text}</Text>;
            })}
          </View>
          <View style={styles.likeContainer}>
            <View style={styles.likeComponent}>
              <Image
                style={styles.likeImage}
                source={require('../../assets/thumbs_up.png')}
              />
              <Text style={styles.textColor}>
                {data.user_ratings.count_positive}
              </Text>
            </View>

            <View style={styles.likeComponent}>
              <Image
                style={styles.likeImage}
                source={require('../../assets/thumbs_down.png')}
              />
              <Text style={styles.textColor}>
                {data.user_ratings.count_negative}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {height: 300, backgroundColor: '#d3d3d3'},
  content: {
    width: '100%',
    height: '100%',
  },
  bytext: {
    textAlign: 'right',
    color: 'black',
  },
  searchView: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    marginVertical: 15,
  },
  textColor: {
    color: 'black',
  },
  separator: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    marginVertical: 15,
  },
  instructorText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  likeContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 50,
  },
  likeComponent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default DetailScreen;
