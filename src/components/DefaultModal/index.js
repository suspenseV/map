import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';
import DefaultInput from '../DefaultInput';
import DismissKeyboard from '../DismissKeyboard';
import DefaultButton from '../DefaultButton';
import { launchImageLibrary } from 'react-native-image-picker';

const DefaultModal = ({ isVisible, dismiss, handleAddMarker }) => {
  const [title, _title] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [description, _description] = useState('');
  const [descriptionErr, _descriptionErr] = useState(false);
  const [titleErr, _titleErr] = useState(false);

  const reset = () => {
    _title(''), _description('');
  };

  const checkInputs = () => {
    if (title.length < 3 || title.length > 15) {
      _titleErr(true);
      return;
    }
    _titleErr(false);
    if (description.length < 3 || description.length > 15) {
      _descriptionErr(true);
      return;
    }
    _descriptionErr(false);

    handleAddMarker(title, description, fileUri);
    reset();
  };

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setFileUri([...fileUri, response?.assets?.[0]?.uri]);
      }
    });
  };

  const renderImage = () => {
    if (!fileUri) return null;
    return (
      <ImageBackground
        source={{ uri: fileUri[fileUri.length - 1] }}
        style={styles.images}
      >
        <View style={styles.counter}>
          <Text>{fileUri.length}</Text>
        </View>
      </ImageBackground>
    );
  };

  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          position: 'absolute',
        }}
      >
        <Modal
          backdropOpacity={0.3}
          isVisible={isVisible}
          onBackdropPress={dismiss}
        >
          <View style={styles.container}>
            <DefaultInput error={titleErr} value={title} onChangeText={_title} />
            <DefaultInput error={descriptionErr} value={description} onChangeText={_description} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={chooseImage}
              style={styles.btnSection}
            >
              {renderImage()}
            </TouchableOpacity>
            <DefaultButton
              title={'Submit'}
              onPress={() => {
                checkInputs();
              }}
            />
          </View>
        </Modal>
      </View>
    </DismissKeyboard>
  );
};

export default DefaultModal;
