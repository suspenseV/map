import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    width: width * .86,
    height: 45,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  disabled: {
    opacity: 0.7,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  uppercase: {
    textTransform: 'uppercase'
  },
});

export default styles;
