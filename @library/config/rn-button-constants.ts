import rnConstants from "./rn-constants";

export const themeOptions = {
    primary: {
        backgroundColor: rnConstants.PRIMARY_COLOR,
        textColor: rnConstants.WHITE_COLOR,
        outlineTextColor: rnConstants.DARK_PRIMARY_COLOR,
        borderColor: rnConstants.PRIMARY_COLOR,
        fontSize: rnConstants.MEDIUM_FONT_SIZE,
        padding: rnConstants.DEFAULT_PADDING,
    },
    secondary: {
        backgroundColor: rnConstants.SECONDARY_COLOR,
        outlineTextColor: rnConstants.DARK_SECONDARY_COLOR,
        textColor: rnConstants.WHITE_COLOR,
        borderColor: rnConstants.SECONDARY_COLOR,
        fontSize: rnConstants.MEDIUM_FONT_SIZE,
        padding: rnConstants.DEFAULT_PADDING,
    },
    warning: {
        backgroundColor: rnConstants.DANGER_COLOR,
        textColor: rnConstants.WHITE_COLOR,
        outlineTextColor: rnConstants.DARK_DANGER_COLOR,
        borderColor: rnConstants.DANGER_COLOR,
        fontSize: rnConstants.MEDIUM_FONT_SIZE,
        padding: rnConstants.DEFAULT_PADDING,
    },
    success: {
        backgroundColor: rnConstants.SUCCESS_COLOR,
        textColor: rnConstants.WHITE_COLOR,
        outlineTextColor: rnConstants.DARK_SUCCESS_COLOR,
        borderColor: rnConstants.SUCCESS_COLOR,
        fontSize: rnConstants.MEDIUM_FONT_SIZE,
        padding: rnConstants.DEFAULT_PADDING,
    },
    danger: {
        backgroundColor: rnConstants.WARNING_COLOR,
        textColor: rnConstants.DANGER_TEXT_COLOR,
        outlineTextColor: rnConstants.DARK_WARNING_COLOR,
        borderColor: rnConstants.DARK_WARNING_COLOR,
        fontSize: rnConstants.MEDIUM_FONT_SIZE,
        padding: rnConstants.DEFAULT_PADDING,
    },
    neutral: {
        backgroundColor: rnConstants.NEUTRAL_COLOR,
        textColor: rnConstants.TEXT_COLOR,
        outlineTextColor: rnConstants.DARK_NEUTRAL_COLOR,
        borderColor: rnConstants.NEUTRAL_COLOR,
        fontSize: rnConstants.MEDIUM_FONT_SIZE,
        padding: rnConstants.DEFAULT_PADDING,
    },
    default: {
        backgroundColor: rnConstants.LIGHT_NEUTRAL_COLOR,
        textColor: rnConstants.TEXT_COLOR,
        outlineTextColor: rnConstants.TEXT_COLOR,
        borderColor: rnConstants.NEUTRAL_COLOR,
        fontSize: rnConstants.MEDIUM_FONT_SIZE,
        padding: rnConstants.DEFAULT_PADDING,
    },
}

export const buttonHeights = {
    small: rnConstants.SMALL_INPUT_HEIGHT,
    default: rnConstants.INPUT_HEIGHT,
    large: rnConstants.LARGE_INPUT_HEIGHT
}