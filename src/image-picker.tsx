import React from "react";
import {
    Alert,
    Image,
    TouchableOpacity,
} from "react-native";
import rnConstants from "../@library/config/rn-constants";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from "expo-image-picker";

interface AttachmentPickerInterface {
    showImagePicker: boolean,
}
interface AttachmentPickerProps {
    onImageSelect: Function
}

export default class AttachmentPicker extends React.Component<AttachmentPickerProps, AttachmentPickerInterface> {
    img = {
        path: 'camera',
        img: require('../assets/camera.jpg')
    }
    constructor(props: AttachmentPickerProps) {
        super(props)
        this.state = {
            showImagePicker: false,
        }
    }

    pickImage = async () => {
        await ImagePicker.requestCameraPermissionsAsync();
        let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            allowsMultipleSelection: false,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            this.props.onImageSelect(result.assets[0])
        }
        else
            Alert.alert('Image', 'Error while seleting image', [
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ], { cancelable: true })
    }


    render() {
        return (
            <TouchableOpacity
                onPress={this.pickImage.bind(this)}
            >
                <Image
                    source={this.img.img}
                    style={[
                        {
                            width: 100,
                            height: 150,
                            resizeMode: 'stretch',
                            marginHorizontal: rnConstants.DEFAULT_MARGIN / 2,
                            borderRadius: 10
                        },
                    ]}
                />
            </TouchableOpacity>
        );
    }
}
