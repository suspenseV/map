import * as actions from '../actions';
import { createReducer } from 'redux-act';

const initialState = {
  markers: [],
};

const markersReducer = createReducer(
  {
    [actions.setMarkersAction]: (state, payload) => ({
      markers: [...state.markers, payload],
    }),
    [actions.deleteMarkerAction]: (state, id) => ({
      markers: [...state.markers.filter((_, idx) => idx !== id)]
    }),
    [actions.resetMarkersAction]: () => ({
      ...initialState,
    }),
  },
  initialState,
);

export default markersReducer;
