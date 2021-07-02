import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Button, StyleSheet, View } from 'react-native';

import { useAppDispatch } from '../hooks';
import { fetchEvents } from '../store/actions';
import List from '../components/List';

const MANUAL_UPDATE = 15;
const AUTO_UPDATE = 60;

const Home = () => {
  const [isCanUpdate, setCanUpdate] = useState(false);
  const dispatch = useAppDispatch();

  const getEvents = useCallback(() => {
    setCanUpdate(false);
    dispatch(fetchEvents(25));
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (!isCanUpdate) {
        const manualUpdateTimeOut = setTimeout(() => {
          setCanUpdate(true);
        }, MANUAL_UPDATE * 1000);

        return () => {
          clearInterval(manualUpdateTimeOut);
          if (isCanUpdate) {
            setCanUpdate(false);
          }
        };
      }
    }, [isCanUpdate]),
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

  return (
    <View style={styles.container}>
      <List />
      <Button disabled={!isCanUpdate} onPress={getEvents} title="Update" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
});

export default Home;
