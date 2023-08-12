import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import useGetVideos from '../../hooks/useGetVideos';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const ListScreen = () => {
  const {fetchVideos, isLoading} = useGetVideos();
  const [listData, setListData] = React.useState();
  const [filterListData, setFilterListData] = React.useState();
  const [search, setSearch] = React.useState('');
  const {navigate} = useNavigation();

  React.useEffect(() => {
    fetchVideos(`list?from=0&size=20`)
      .then(resp => {
        setListData(resp);
      })
      .catch(err => {
        console.log('err ==>> ', err);
      });
  }, []);

  const FlatListItemSeparator = () => {
    return <View style={styles.itemSepratorStyle} />;
  };

  const renderItem = ({item}) => {
    return (
      <View style={{marginVertical: 15, marginHorizontal: 15}}>
        <TouchableOpacity
          onPress={() => navigate('DetailScreen', {item: item})}
          style={{
            flexDirection: 'row',
            flex: 1,
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 40, width: 40, resizeMode: 'contain'}}
            source={{uri: item.thumbnail_url}}
          />

          <Text style={{color: 'black', fontSize: 15}}>{item.name}</Text>

          <Image
            style={{height: 40, width: 40, resizeMode: 'contain'}}
            source={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const searchFilterText = data => {
    if (data) {
      let filteredData = listData?.results?.filter(function (item) {
        return item.name.includes(search);
      });
      setSearch(data);

      setFilterListData(filteredData);
    }
    setSearch(data);
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <TextInput
        style={styles.textInput}
        value={search}
        onChangeText={text => searchFilterText(text)}
        placeholder="Search"
        placeholderTextColor={'black'}
      />

      {isLoading && <ActivityIndicator />}
      <View style={{flex: 1}}>
        <FlatList
          style={{flex: 1, marginTop: 10}}
          data={
            filterListData && search !== '' ? filterListData : listData?.results
          }
          renderItem={renderItem}
          ItemSeparatorComponent={FlatListItemSeparator}
          keyExtractor={(item, index) => item.created_at.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 300,
    borderColor: 'black',
    borderRadius: 25,
    borderWidth: 1,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default ListScreen;
