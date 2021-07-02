import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { find } from 'lodash';
import { IEvent } from '../types';
import { fetchEvents } from './actions';
import type { RootState } from './index';

interface EventsStore {
  items: IEvent[];
  loading: boolean;
}

const initialState: EventsStore = {
  items: [],
  loading: false,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    updateEvents: (state, action: PayloadAction<IEvent[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchEvents.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchEvents.rejected, state => {
      state.loading = false;
      state.items = [];
    });
  },
});

export const { updateEvents } = eventsSlice.actions;

export const selectEvents = (state: RootState) => state.events.items;
export const selectEventsLoading = (state: RootState) => state.events.loading;

export const selectEventById = (state: RootState, id: string) =>
  find(state.events.items, ev => ev.id === id);

export default eventsSlice.reducer;
