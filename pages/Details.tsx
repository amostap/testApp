import { RouteProp } from '@react-navigation/native';
import { map } from 'lodash';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '../hooks';
import { selectEventById } from '../store/eventsReducer';
import { RootStackParamList } from '../types';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const Details = ({ route }: Props) => {
  const event = useAppSelector(state =>
    selectEventById(state, route.params.id),
  );

  const renderDetail = (val: keyof typeof event) => {
    if (event) {
      return (
        <View style={styles.view}>
          <Text style={styles.title}>{`${val}: `}</Text>
          {map(
            Object.keys(event[val] ?? {}),
            (key: keyof typeof event.actor) => (
              <View style={styles.row} key={key}>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {key + ': ' + event[val][key]}
                </Text>
              </View>
            ),
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic">
      {renderDetail('actor' as keyof typeof event)}
      {renderDetail('org' as keyof typeof event)}
      {/* ... */}
      <Text>...</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
    fontWeight: '600',
    fontSize: 17,
  },
  container: {
    padding: 15,
  },
  row: {
    marginBottom: 5,
    flexDirection: 'row',
  },
});

export default Details;
