import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Button,
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native';

import Loader from '../components/Loader';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectEvents } from '../store/eventsReducer';
import { fetchEvents } from '../store/actions';
import { IEvent, RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const MANUAL_UPDATE = 15;
const AUTO_UPDATE = 60;

const Home = ({ navigation }: Props) => {
  const [canUpdate, setCanUpdate] = useState(false);
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEvents);

  const getEvents = useCallback(() => {
    setCanUpdate(false);
    dispatch(fetchEvents(25));
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (!canUpdate) {
        const manualUpdateTimeOut = setTimeout(() => {
          setCanUpdate(true);
        }, MANUAL_UPDATE * 1000);

        return () => {
          clearInterval(manualUpdateTimeOut);
          if (canUpdate) {
            setCanUpdate(false);
          }
        };
      }
    }, [canUpdate]),
  );

  useFocusEffect(
    useCallback(() => {
      getEvents();

      const autoUpdateTimer = setInterval(() => {
        getEvents();
      }, AUTO_UPDATE * 1000);

      return () => {
        clearInterval(autoUpdateTimer);
      };
    }, [getEvents]),
  );

  const renderItem = (item: ListRenderItemInfo<IEvent>) => {
    const { item: event } = item;

    return (
      <TouchableOpacity
        key={event.id}
        onPress={() => navigation.navigate('Details', { id: event.id })}>
        <View style={styles.listItem}>
          <Image
            style={styles.avatar}
            source={{
              uri: event.actor.avatar_url,
            }}
          />
          <Text style={styles.text}>{event.actor.display_login}</Text>
          <Text style={styles.event}>{` - ${event.type}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList<IEvent>
        style={styles.list}
        data={events}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
        ListEmptyComponent={Loader}
      />
      <Button disabled={!canUpdate} onPress={getEvents} title="Update" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  list: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    fontWeight: '500',
    fontSize: 17,
    color: '#fff',
  },
  event: {
    fontSize: 16,
    color: '#fff',
  },
  avatar: {
    width: 35,
    height: 35,
    marginRight: 5,
  },
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#019782',
  },
});

export default Home;
