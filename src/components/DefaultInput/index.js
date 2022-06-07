import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';

const DefaultInput = ({
  title,
  value,
  placeholder,
  onChangeText,
  onEndEditing,
  error
}) => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{title || ''}</Text>
      <View style={styles.row}>
        <TextInput
          value={value}
          placeholder={placeholder || title || 'Type here'}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          style={[styles.input, error && {borderColor: 'red'}]}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(DefaultInput);
