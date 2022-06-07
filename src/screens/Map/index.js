import React, { useEffect, useState } from 'react';
import MapScreen from './Map';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { Marker } from 'react-native-maps';

const Map = ({
  addMarkerThrowSaga,
  markersState,
  resetMarkers,
  deleteMarker,
}) => {
  const [isVisible, _isVisible] = useState(false);
  const [markers, _markers] = useState(markersState);
  const [selectedLocation, _selectedLocation] = useState();
  const handleLongPress = latlng => {
    _selectedLocation(latlng);
    _isVisible(!isVisible);
  };

  const handleDelete = idx => {
    deleteMarker(idx);
  };

  useEffect(() => {
    _markers([...markersState]);
  }, [markersState]);

  const handleAddMarker = (title, description, images) => {
    const marker = {
      latlng: selectedLocation,
      title,
      description,
      images
    };
    addMarkerThrowSaga(marker);
    dismiss();
  };

  const dismiss = () => {
    _isVisible(!isVisible);
  };

  return (
    <MapScreen
      markers={markers}
      handleLongPress={handleLongPress}
      isVisible={isVisible}
      dismiss={dismiss}
      handleAddMarker={handleAddMarker}
      handleDelete={handleDelete}
    />
  );
};

const mapStateToProps = state => ({
  markersState: state.markers.markers,
});

const mapDispatchToProps = dispatch => ({
  addMarkerThrowSaga: payload => dispatch(actions.addMarkerAction(payload)),
  resetMarkers: () => dispatch(actions.resetMarkersAction()),
  deleteMarker: idx => dispatch(actions.deleteMarkerAction(idx)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
