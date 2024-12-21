import { FlashMode } from "expo-camera";
import { Platform, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { CameraType } from "expo-camera/build/legacy/Camera.types";
import { FlashModeValues } from "../../@library/config/enum";
import { RnView, RnButton, RnIcon } from "../../@library";
import rnConstants from "../../@library/config/rn-constants";


interface PFCameraToolbarProps {
    cameraType: CameraType,
    flashMode: FlashMode,
    setFlashMode: Function,
    setCameraType: Function,
    onCapture: Function,
}

export const PFCameraToolbar = (props: PFCameraToolbarProps) => {
    return <RnView row justifyBetween padding={rnConstants.DEFAULT_PADDING * 2} style={{ position: 'absolute', bottom: 0 }}>
        <RnButton style={{ height: rnConstants.TOOLBAR_HEIGHT }} transparent onPress={() => props.setFlashMode({ flashMode: props.flashMode === FlashModeValues.ON ? FlashModeValues.OFF : FlashModeValues.ON })}
            iconLeft={<RnIcon
                name={props.flashMode == FlashModeValues.ON ? "flash-on" : 'flash-off'}
                size={rnConstants.ICON_SIZE_LARGE}
                color={rnConstants.WHITE_COLOR}
            />} />
        <TouchableWithoutFeedback
            onPress={(...prop) => props.onCapture(...prop)}>
            <RnView style={[styles.captureBtn]}>
            </RnView>
        </TouchableWithoutFeedback>

        <RnButton style={{ height: rnConstants.TOOLBAR_HEIGHT }} transparent onPress={() => props.setCameraType(
            { type: props.cameraType === CameraType.back ? CameraType.front : CameraType.back }
        )} iconLeft={<RnIcon
            name={Platform.OS === "ios" ? 'flip-camera-ios' : "flip-camera-android"}
            size={rnConstants.ICON_SIZE_LARGE}
            color={rnConstants.WHITE_COLOR}
        />} />
    </RnView>

}

const styles = StyleSheet.create({
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 38,
        backgroundColor: "red",
        borderColor: "transparent",
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: rnConstants.WHITE_COLOR,
        backgroundColor: 'transparent',
    },
});