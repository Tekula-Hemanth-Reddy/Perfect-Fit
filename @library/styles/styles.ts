import { StyleSheet } from "react-native";
import colors from "./colors";
import cssConstants from "./css-constants";

const layout = StyleSheet.create({
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
  col: {
    display: "flex",
    flexDirection: "column",
  },
  border: {
    borderWidth: 1,
    borderColor: cssConstants.BORDER_COLOR,
    borderRadius: cssConstants.BASE_BORDER_RADIUS,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  textAlignLeft: {
    textAlign: "left",
  },
  textAlignRight: {
    textAlign: "right",
  },
});

// form styles
export const formStyles = StyleSheet.create({
  pickerLabel: {
    fontSize: cssConstants.BASE_FONT_SIZE,
  },
  mainForm: {
    borderRadius: cssConstants.BASE_BORDER_RADIUS,
    borderWidth: 1,
    borderColor: cssConstants.BORDER_COLOR,
    backgroundColor: colors.WHITE,
    marginVertical: 10,
  },

  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: cssConstants.DEFAULT_PADDING
  },

  mainHeaderAddress: {
    fontSize: cssConstants.EXTRA_SMALL_FONT_SIZE,
    color: cssConstants.TEXT_COLOR,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    flexShrink: 1,
  },

  // General info text style
  fieldText: {
    color: cssConstants.TEXT_COLOR,
    flex: 1,
    fontSize: cssConstants.SMALL_FONT_SIZE,
    marginBottom: cssConstants.DEFAULT_MARGIN,
  },

  logo: {
    width: 80,
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
  },

  form: {
    padding: cssConstants.DEFAULT_PADDING,
  },

  // View with Input field along with label
  field: {
    margin: cssConstants.DEFAULT_MARGIN,
    borderRadius: cssConstants.INPUT_BORDER_RADIUS,
  },

  fieldHeading: {
    fontSize: cssConstants.INPUT_FONT_SIZE,
    marginBottom: cssConstants.DEFAULT_MARGIN,
    fontWeight: "bold",
    color: "#000000",
    opacity: 0.6,
    lineHeight: 24,
  },

  // Input field label style
  fieldName: {
    marginBottom: cssConstants.DEFAULT_MARGIN / 2,
    color: cssConstants.TEXT_COLOR,
  },

  fieldInputContainer: {
    height: cssConstants.INPUT_HEIGHT,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },

  fieldInput: {
    paddingHorizontal: cssConstants.DEFAULT_PADDING,
    height: cssConstants.INPUT_HEIGHT,
    fontSize: cssConstants.BASE_FONT_SIZE,
    color: cssConstants.TEXT_COLOR,
    width: "100%",
    borderRadius: cssConstants.INPUT_BORDER_RADIUS,
    borderWidth: 1,
    borderColor: cssConstants.BORDER_COLOR,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cssConstants.INPUT_BACKGROUND_COLOR,
  },

  picker: {
    height: cssConstants.INPUT_HEIGHT,
    width: "100%",
  },
  pickerTextStyle: {
    fontSize: cssConstants.SMALL_FONT_SIZE,
    color: cssConstants.TEXT_COLOR,
    width: "100%",
  },
  pickerItemTextStyle: {
    fontSize: cssConstants.BASE_FONT_SIZE,
  },

  tableHeader: {
    backgroundColor: cssConstants.PRIMARY_COLOR,
    padding: cssConstants.DEFAULT_PADDING,
    minHeight: cssConstants.INPUT_HEIGHT,
    width: 200,
    alignContent: "center",
  },

  tableHeaderText: {
    color: colors.WHITE,
    alignSelf: "center",
    fontSize: cssConstants.EXTRA_SMALL_FONT_SIZE,
    textAlign: "left",
  },

  tableCell: {
    padding: cssConstants.DEFAULT_PADDING,
    borderColor: cssConstants.BORDER_COLOR,
    // borderLeftWidth: 1,
    flex: 1,
    minHeight: cssConstants.INPUT_HEIGHT,
    width: 200,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  tableCelltext: {
    color: cssConstants.TEXT_COLOR,
    borderColor: cssConstants.BORDER_COLOR,
    // padding: cssConstants.DEFAULT_PADDING,
    borderRadius: cssConstants.BASE_BORDER_RADIUS,
    fontSize: cssConstants.EXTRA_SMALL_FONT_SIZE,
    minHeight: cssConstants.INPUT_HEIGHT,
  },

  tableModalView: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    backgroundColor: "rgba( 0, 0, 0, 0.6 )",
  },

  tableModalContent: {
    backgroundColor: colors.WHITE,
    elevation: 5,
    borderRadius: cssConstants.BASE_BORDER_RADIUS,
    margin: cssConstants.DEFAULT_MARGIN * 2,
    padding: cssConstants.DEFAULT_PADDING * 2,
  },

  saveButton: {
    color: cssConstants.PRIMARY_COLOR,
    borderRadius: cssConstants.BASE_BORDER_RADIUS,
    borderColor: cssConstants.BORDER_COLOR,
    borderWidth: 1,
    padding: cssConstants.DEFAULT_PADDING,
  },

  radioButtonWrapper: {
    width: 26,
    height: 26,
    borderColor: cssConstants.BORDER_COLOR,
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: cssConstants.DEFAULT_MARGIN,
  },
  disabledFieldControl: {
    backgroundColor: cssConstants.DISABLE_COLOR,
  },
  highlightedFieldControl: {
    borderColor: cssConstants.PRIMARY_COLOR,
    borderWidth: 1,
    shadowColor: cssConstants.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  }

});

export const commonStyles = StyleSheet.create({
  fullView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.WHITE,
  },
  thumbnail: {
    height: 60,
    width: 60,
    marginHorizontal: cssConstants.DEFAULT_MARGIN / 2,
    borderRadius: 50,
  },
  boxShadow: {
    shadowColor: cssConstants.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  ...layout,
});
