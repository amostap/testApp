import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IEvent } from '../types';
import Loader from './Loader';
import ListItem from './ListItem';
import { useAppSelector } from '../hooks';
import { selectEvents } from '../store/eventsReducer';

const List = () => {
  const events = useAppSelector(selectEvents);
  const navigation = useNavigation();

  const handleNavigate = (id: string) => {
    navigation.navigate('Details', { id });
  };

  const renderItem = (props: ListRenderItemInfo<IEvent>) => (
    <ListItem event={props.item} onPress={handleNavigate} />
  );

  return (
    <FlatList
      style={styles.list}
      data={events}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListEmptyComponent={Loader}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

export default React.memo(List);
