import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  poster: {
    marginHorizontal: 10,
    alignItems: 'center',
    width: width * 0.5,
    height: height * 0.3,
    margin: 10
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    marginTop: height * 0.7,
    height: height * 0.3,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 10,
  },
});

export default styles;
