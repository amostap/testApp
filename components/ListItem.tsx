import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IEvent } from '../types';

interface Props {
  event: IEvent;
  onPress: (id: string) => void;
}

const ListItem = ({ event, onPress }: Props) => (
  <TouchableOpacity key={event.id} onPress={() => onPress(event.id)}>
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

const styles = StyleSheet.create({
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

export default React.memo(ListItem);
