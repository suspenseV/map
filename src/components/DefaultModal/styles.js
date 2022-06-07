import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: height * 0.3,
    borderWidth: 1,
    borderRadius: 25,
    width: width * 0.86,
    height: height * 0.52,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  images: {
    width: 150,
    height: 150,
    marginHorizontal: 3,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  btnSection: {
    alignItems: 'center',
    marginStart: 10,
    marginBottom: 15,
    width: 160,
    height: 170,
    borderRadius: 25,
  },
  counter: {
    borderWidth: 1,
    borderRadius: 100,
    width: 20,
    height: 20,
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 5,
    backgroundColor: '#ffffff'
  },
});

export default styles;
