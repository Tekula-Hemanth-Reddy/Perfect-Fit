import { Dimensions, StyleSheet } from "react-native";
import rnConstants from "./rn-constants";

const layout = StyleSheet.create({
  background_transperent: {
    backgroundColor: 'transparent'
  },
  border: {
    borderWidth: 1,
    borderColor: rnConstants.BORDER_COLOR,
    borderRadius: rnConstants.BASE_BORDER_RADIUS,
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rowSpaceBetween: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowFlexEnd: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rowFlexStart: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  centerAlign: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const textStyles = StyleSheet.create({
  // used in text
  textAlignCenter: {
    textAlign: "center",
  },
  textAlignLeft: {
    textAlign: "left",
  },
  textAlignRight: {
    textAlign: "right",
  },
  // used for button
  buttonText: {
    lineHeight: 20,
  },
})

const containerStyles = StyleSheet.create({
  // used for icon
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  // used in button
  buttonContainer:
  {
    borderRadius: rnConstants.INPUT_BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
})

const imagePicker = StyleSheet.create({
  imagePicker: {
    width: 100,
    height: 150,
    resizeMode: 'stretch',
    marginHorizontal: rnConstants.DEFAULT_MARGIN / 2,
    borderRadius: 10
  },

  preview: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },

  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionModalView: {
    width: 260,
    backgroundColor: rnConstants.WHITE_COLOR,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: rnConstants.DEFAULT_PADDING,
    borderRadius: 100,
    marginBottom: rnConstants.DEFAULT_MARGIN / 2,
  },
  galleryButton: {
    backgroundColor: rnConstants.GALLERY,
  },
  cameraButton: {
    backgroundColor: rnConstants.CAMERA,
  },
  closeButton: {
    backgroundColor: rnConstants.WARNING_BACKGROUND,
  }
});

const mainStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: rnConstants.WHITE_COLOR,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  previewButton: {
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  previewTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export const rnStyles = StyleSheet.create({
  fullView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: rnConstants.BACKGROUND_COLOR,
  },
  thumbnail: {
    height: 60,
    width: 60,
    marginHorizontal: rnConstants.DEFAULT_MARGIN / 2,
    borderRadius: 50,
  },
  boxShadow: {
    shadowColor: rnConstants.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  ...containerStyles,
  ...textStyles,
  ...layout,
  ...imagePicker,
  ...mainStyles
});
