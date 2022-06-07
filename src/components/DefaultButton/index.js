import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './styles';

const DefaultButton = ({
  title,
  onPress,
  disabled = false,
  uppercase = true,
}) => (
  <TouchableOpacity
    disabled={disabled}
    activeOpacity={1}
    onPress={onPress}
    style={[styles.button, disabled && styles.disabled]}
  >
    <Text style={[styles.label, uppercase && styles.uppercase]}>{title}</Text>
  </TouchableOpacity>
);

export default DefaultButton;
