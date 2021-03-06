import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../services/axios';
import { IEvent } from '../types';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (count: number) => {
    const response = await axios.get<IEvent[]>(
      `/users/afc163/events/public?per_page=${count}`,
    );

    return response.data;
  },
);
