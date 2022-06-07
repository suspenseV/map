import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';
import { Animated as AnimatedMap, AnimatedRegion } from 'react-native-maps';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const MarkersList = ({ data, regionHandle }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const LATITUDE = 37.78825;
  const LONGITUDE = -122.4324;
  const [region, _region] = useState(
    new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
    }),
  );

  useEffect(() => {
    region.stopAnimation();
    region
      .timing({
        latitude: scrollX.interpolate({
          inputRange: data.map((m, i) => i * SNAP_WIDTH),
          outputRange: data.map(m => m.latlng.latitude),
        }),
        longitude: scrollX.interpolate({
          inputRange: data.map((m, i) => i * SNAP_WIDTH),
          outputRange: data.map(m => m.latlng.longitude),
        }),
        useNativeDriver: true,
        duration: 0,
      })
      .start();
    regionHandle(region);
  }, [scrollX]);

  const ITEM_SIZE = width * 0.7;
  const SPACING = 10;
  const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
  const SNAP_WIDTH = ITEM_SIZE + SPACING;
  const markers = [{}, ...data, {}];

  function getMarkerState(scrollX, i) {
    const xLeft = -SNAP_WIDTH * i + SNAP_WIDTH / 2;
    const xRight = -SNAP_WIDTH * i - SNAP_WIDTH / 2;
    const xPos = -SNAP_WIDTH * i;

    const center = scrollX.interpolate({
      inputRange: [xPos - 10, xPos, xPos + 10],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    const selected = scrollX.interpolate({
      inputRange: [xRight, xPos, xLeft],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    const translateX = scrollX;

    const markerScale = selected.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.2],
    });

    return {
      translateX,
      center,
      selected,
      markerScale,
    };
  }

  const animations = data.map((m, i) => getMarkerState(scrollX, i));

  const renderItem = ({ item, index }) => {
    if (!item.title) {
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

    return (
      <View style={{ width: ITEM_SIZE }}>
        <Animated.View
          style={{
            alignItems: 'center',
            borderWidth: 1,
            marginHorizontal: SPACING,
            padding: SPACING,
            borderRadius: 25,
            transform: [{ scale }],
          }}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.centeredView}>
      <Animated.FlatList
        data={markers}
        keyExtractor={(_, idx) => idx}
        renderItem={item => renderItem(item)}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={ITEM_SIZE}
        bounces={false}
        decelerationRate={0}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
      />
    </View>
  );
};
