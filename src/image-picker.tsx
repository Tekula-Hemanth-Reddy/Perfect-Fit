import React from "react";
import {
    Image,
    TouchableOpacity,
    Modal,
} from "react-native";
import rnConstants from "../@library/config/rn-constants";
import { RnIcon, RnText, RnView } from "../@library";
import { rnStrings } from "../@library/config/rn-strings";
import * as ImagePicker from 'expo-image-picker';
import { rnStyles } from "../@library/config/rn-styles";
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
        // hide modal
        this.setState({ showImagePicker: false })
        if (!result.canceled) {
            this.props.onImageSelect(result.assets[0])
        }
    }


    render() {
        return (
            <>
                <TouchableOpacity
                    // onPress={() => {
                    //     this.setState({ showImagePicker: true })
                    // }}
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
                {/* {
                    this.state.showImagePicker &&
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.showImagePicker}
                        onRequestClose={() => {
                            this.setState({ showImagePicker: false })
                        }}>
                        <RnView padding={2 * rnConstants.DEFAULT_PADDING} style={rnStyles.bottomView}>
                            <RnView row justifyBetween style={rnStyles.actionModalView}>
                                <RnView col marginHorizontal>
                                    <TouchableOpacity
                                        onPress={this.pickImage.bind(this)}
                                        style={[rnStyles.actionButton, rnStyles.galleryButton]}
                                    >
                                        <RnIcon name="image" color={rnConstants.WHITE_COLOR} size={rnConstants.ICON_SIZE} />
                                    </TouchableOpacity>
                                    <RnText textAlignCenter>{rnStrings.GALLERY}</RnText>
                                </RnView>
                                <RnView col marginHorizontal>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                showImagePicker: false,
                                            }, this.showCamera.bind(this))
                                        }}
                                        style={[rnStyles.actionButton, rnStyles.cameraButton]}
                                    >
                                        <RnIcon name="camera-alt" color={rnConstants.WHITE_COLOR} size={rnConstants.ICON_SIZE} />
                                    </TouchableOpacity>
                                    <RnText textAlignCenter >{rnStrings.CAMERA}</RnText>
                                </RnView>
                                <RnView col marginHorizontal>
                                    <TouchableOpacity
                                        onPress={() => { this.setState({ showImagePicker: false }) }}
                                        style={[rnStyles.actionButton, rnStyles.closeButton]}
                                    >
                                        <RnIcon name="close" color={rnConstants.WHITE_COLOR} size={rnConstants.ICON_SIZE} />
                                    </TouchableOpacity>
                                    <RnText>{rnStrings.CLOSE}</RnText>
                                </RnView>
                            </RnView >
                        </RnView >
                    </Modal >
                } */}
            </>
        );
    }
}
