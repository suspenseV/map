import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Marker,
  Animated as AnimatedMap,
  AnimatedRegion,
} from 'react-native-maps';

import styles from './styles';
import DefaultModal from '../../components/DefaultModal';

const { width, height } = Dimensions.get('window');

const MapScreen = ({
  handleLongPress,
  isVisible,
  dismiss,
  markers,
  handleAddMarker,
  handleDelete,
}) => {
  const LATITUDE = 37.78825;
  const LONGITUDE = -122.4324;
  const flatlistRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const openInfo = useRef(new Animated.Value(0)).current;
  const [isOpened, _isOpened] = useState(false);
  const [scrolling, _scrolling] = useState(false);
  const ITEM_SIZE = width * 0.7;
  const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
  const SNAP_WIDTH = ITEM_SIZE;
  const data = [{}, ...markers, {}];
  const [region, _region] = useState(
    new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
    }),
  );

  const deleteModal = idx => {
    Alert.alert(
      'Delete Place?',
      'You cannot undo this action',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(idx),
          style: 'delete',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const scrollTo = offset => {
    flatlistRef.current.scrollToOffset({ animated: true, offset });
    console.log(offset);
    // Animated.timing(scrollX, {
    //   toValue: scrollX,
    //   duration: 1000,
    // }).start();
  };

  const markersList = () => {
    useEffect(() => {
      if (markers.length > 1) {
        region.stopAnimation();
        region
          .timing({
            latitude: scrollX.interpolate({
              inputRange: markers.map((m, i) => i * SNAP_WIDTH),
              outputRange: markers.map(m => m.latlng.latitude),
            }),
            longitude: scrollX.interpolate({
              inputRange: markers.map((m, i) => i * SNAP_WIDTH),
              outputRange: markers.map(m => m.latlng.longitude),
            }),
            useNativeDriver: false,
            duration: 0,
          })
          .start();
      }
    }, [scrollX, markers]);

    const open = () => {
      Animated.timing(openInfo, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    };

    const close = () => {
      Animated.timing(openInfo, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    };

    const blockWidth = openInfo.interpolate({
      inputRange: [0, 1],
      outputRange: [ITEM_SIZE, width],
    });

    const blockHeight = openInfo.interpolate({
      inputRange: [0, 1],
      outputRange: [height * 0.3, height * 0.4],
    });

    const handleOpenBlock = index => {
      _isOpened(!isOpened);
      isOpened ? close() : open();
    };

    const renderItem = ({ item, index }) => {
      if (!item.latlng) {
        return <View style={{ width: SPACER_ITEM_SIZE }}></View>;
      }
      const inputRange = [
        (index - 2) * ITEM_SIZE,
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
      ];

      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1.2, 0.8],
      });

      const renderImages = () => {
        if (item && item.images) {
          return item.images.map(uri => (
            <Image style={styles.image} source={{ uri: `${uri}` }} />
          ));
        }
      };

      return (
        <Animated.View
          style={{ width: ITEM_SIZE, height: blockHeight, width: blockWidth }}
        >
          <Animated.View
            style={[
              styles.placeInfo,
              {
                transform: [{ scale }],
              },
            ]}
          >
            <TouchableWithoutFeedback
              activeOpacity={0.7}
              onPress={() => deleteModal(index - 1)}
            >
              <Image
                style={{ width: 24, height: 24, position: 'absolute', right: 10, top: 5}}
                source={require('../../assets/trash.png')}
              ></Image>
            </TouchableWithoutFeedback>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <ScrollView
              onScrollBeginDrag={() => _scrolling(true)}
              onScrollEndDrag={() => _scrolling(false)}
              nestedScrollEnabled={true}
              style={styles.scrollView}
              contentContainerStyle={{
                alignItems: 'center',
              }}
              decelerationRate={0}
              scrollEventThrottle={16}
              onStartShouldSetResponder={true}
              bounces={false}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {renderImages()}
            </ScrollView>
          </Animated.View>
        </Animated.View>
      );
    };

    return (
      <View style={styles.centeredView}>
        <Animated.FlatList
          data={data}
          keyExtractor={(_, idx) => idx}
          renderItem={item => renderItem(item)}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          ref={flatlistRef}
          scrollEnabled={!scrolling}
          snapToInterval={ITEM_SIZE}
          bounces={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
        />
      </View>
    );
  };

  const renderMarkers = () =>
    markers.map((marker, index) => (
      <Marker
        key={index}
        onPress={() => scrollTo(index * ITEM_SIZE)}
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
      />
    ));

  return (
    <View style={styles.container}>
      <AnimatedMap
        style={styles.map}
        region={region}
        // onRegionChange={_region}
        onLongPress={e => handleLongPress(e.nativeEvent.coordinate)}
      >
        {renderMarkers()}
      </AnimatedMap>
      {markersList(markers)}

      <DefaultModal
        isVisible={isVisible}
        dismiss={dismiss}
        handleAddMarker={handleAddMarker}
      />
    </View>
  );
};

export default MapScreen;
