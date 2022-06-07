import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    marginTop: height * 0.55,
    height: height * 0.5,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 10,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  placeInfo: {
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    height: height * 0.3,
  },
  scrollView: {
  }
});

export default styles;
