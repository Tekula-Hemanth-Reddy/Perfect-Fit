import React from "react";
import {
    Image,
    TouchableOpacity,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from "expo-image-picker";
import { rnStyles } from "../@library/config/rn-styles";

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
    }


    render() {
        return (
            <TouchableOpacity
                onPress={this.pickImage.bind(this)}
            >
                <Image
                    source={this.img.img}
                    style={rnStyles.imagePicker}
                />
            </TouchableOpacity>
        );
    }
}
