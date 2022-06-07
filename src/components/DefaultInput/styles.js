import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  withIcon: {
    paddingRight: '10%',
  },
  input: {
    width: width * .76,
    height: 44,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    color: '#090911',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: '4%',
  },
  title: {
    color: '#090911',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
});

export default styles;
