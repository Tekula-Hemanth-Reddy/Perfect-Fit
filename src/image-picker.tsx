import React, { useRef } from "react";
import {
    Image,
    TouchableOpacity,
    Modal,
    Alert,
    Dimensions
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from "expo-image-picker";
import { rnStyles } from "../@library/config/rn-styles";
import rnConstants from "../@library/config/rn-constants";
import { RnIcon, RnText, RnView } from "../@library";
import { rnStrings } from "../@library/config/rn-strings";
import { Camera, CameraType, CameraView, PermissionStatus } from "expo-camera";
import { FlashModeValues } from "../@library/config/enum";
import { ImageResult } from "expo-image-manipulator/build/ImageManipulator.types";
import { PFCameraToolbar } from "./camera/toolbar";
import { PFImageToolbar } from "./camera/image-toolbar";

interface PFCamera {
    type: CameraType,
    capture?: ImageResult,
    flashMode: FlashModeValues,
}

interface AttachmentPickerInterface {
    showImagePicker: boolean,
    showCameraModal: boolean,
    pfCamera: PFCamera
}
interface AttachmentPickerProps {
    onImageSelect: Function
}

export default class AttachmentPicker extends React.Component<AttachmentPickerProps, AttachmentPickerInterface> {
    img = {
        path: 'camera',
        img: require('../assets/camera.jpg')
    }
    cameraRef = React.createRef<CameraView>();
    constructor(props: AttachmentPickerProps) {
        super(props)
        this.state = {
            showImagePicker: false,
            showCameraModal: false,
            pfCamera: {
                type: 'back',
                capture: undefined,
                flashMode: FlashModeValues.AUTO,
            }
        }
    }

    pickImage = async () => {
        await ImagePicker.requestCameraPermissionsAsync();
        let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

    async showCamera() {
        const { status } = await Camera.getCameraPermissionsAsync();
        if (status === PermissionStatus.GRANTED) {
            this.showCameraModal();
        }
        else {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            if (cameraPermission.granted) {
                this.showCameraModal();
            }
            else {
                Alert.alert(rnStrings.PERMISSION, rnStrings.NEED_CAMERA_PERMISSION, [{
                    style: 'cancel',
                    text: rnStrings.OK // Also can use children property
                }])
            }
        }
    }

    showCameraModal = () => {
        this.setState({
            showCameraModal: true,
            pfCamera: {
                type: 'back',
                capture: undefined,
                flashMode: FlashModeValues.AUTO,
            }
        });
    }

    setPfData = (data: Partial<PFCamera>) => {
        this.setState({ pfCamera: { ...this.state.pfCamera, ...data } });
    }

    closeCamera = () => {
        this.setState({ showCameraModal: false })
    }

    onCapture = async () => {
        if (!this.cameraRef.current) {
            return;
        }
        const photoData = await this.cameraRef.current.takePictureAsync();
        this.setPfData({ capture: photoData });
    }

    onAccept = () => {
        this.closeCamera();
        this.props.onImageSelect(this.state.pfCamera.capture)
    }


    render() {
        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ showImagePicker: true })
                    }}
                // onPress={this.pickImage.bind(this)}
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
                {
                    this.state.showImagePicker &&
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.showImagePicker}
                        onRequestClose={() => {
                            this.setState({ showImagePicker: false })
                        }}>
                        <RnView padding={rnConstants.DEFAULT_PADDING} style={rnStyles.bottomView}>
                            <RnView padding row justifyBetween style={rnStyles.actionModalView}>
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
                }
                {
                    this.state.showCameraModal &&
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.showCameraModal}
                        onRequestClose={this.closeCamera.bind(this)}>
                        <RnView full>
                            {!this.state.pfCamera.capture ?
                                <RnView full style={{ height: Dimensions.get("window").height * 0.89, position: 'relative' }}>
                                    <CameraView
                                        facing={this.state.pfCamera.type}
                                        flash={this.state.pfCamera.flashMode}
                                        ref={this.cameraRef}
                                        style={rnStyles.preview}
                                    />
                                    <TouchableOpacity
                                        onPress={this.closeCamera.bind(this)} style={{ position: 'absolute', right: rnConstants.DEFAULT_PADDING, top: rnConstants.DEFAULT_PADDING * 2 }}>
                                        <RnIcon
                                            name="close"
                                            size={30}
                                            color="white"
                                        />
                                    </TouchableOpacity>

                                    {/* Camera Options */}
                                    <PFCameraToolbar
                                        flashMode={this.state.pfCamera.flashMode}
                                        cameraType={this.state.pfCamera.type}
                                        setFlashMode={this.setPfData.bind(this)}
                                        setCameraType={this.setPfData.bind(this)}
                                        onCapture={this.onCapture.bind(this)}
                                    />
                                </RnView>
                                : <RnView full style={{ height: Dimensions.get("window").height * 0.89, position: 'relative' }}>
                                    <Image source={this.state.pfCamera.capture} style={rnStyles.preview} />
                                    <PFImageToolbar
                                        onAccept={this.onAccept.bind(this)}
                                        onClose={this.closeCamera.bind(this)}
                                        onRetake={this.setPfData.bind(this)}
                                    />
                                </RnView>
                            }
                        </RnView >
                    </Modal >
                }
            </>
        );
    }
}