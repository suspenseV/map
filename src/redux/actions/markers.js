import { createAction } from 'redux-act';

export const setMarkersAction = createAction('SET_MARKERS_ACTION');
export const addMarkerAction = createAction('ADD_MARKER_ACTION');
export const deleteMarkerAction = createAction('DELETE_MARKER_ACTION');
export const resetMarkersAction = createAction('RESET_MARKERS_ACTION');