import { StyleSheet } from "react-native";
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
    lineHeight: 24,
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
});
