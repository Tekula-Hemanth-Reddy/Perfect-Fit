import React from "react";
import { View } from "react-native";
import cssConstants from "../styles/css-constants";
import { commonStyles } from "../styles/styles";
import { THRViewProps } from "./types";


export function ViewTHR({
    row, col, full,
    justifyBetween,
    justifyCenter,
    justifyEnd,
    justifyStart,
    padding,
    paddingHorizontal,
    paddingTop,
    paddingBottom,
    paddingVertical,
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    paddingLeft,
    paddingRight,
    marginLeft,
    marginRight,
    border, ...viewProps }: THRViewProps) {
    return <View {...viewProps} style={[{ backgroundColor: 'transparent' },
    (row ? commonStyles.row : {}),
    (justifyBetween ? commonStyles.rowSpaceBetween : {}),
    (justifyCenter ? commonStyles.centerAlign : {}),
    (justifyEnd ? commonStyles.rowFlexEnd : {}),
    (justifyStart ? commonStyles.rowFlexStart : {}),


    (col ? commonStyles.col : {}),

    (padding && !isNaN(Number(padding)) ? { padding: Number(padding) } : {}),
    (padding && typeof padding === 'boolean' ? { padding: cssConstants.DEFAULT_PADDING } : {}),

    (paddingHorizontal && !isNaN(Number(paddingHorizontal)) ? { paddingHorizontal: Number(paddingHorizontal) } : {}),
    (paddingHorizontal && typeof paddingHorizontal === 'boolean' ? { paddingHorizontal: cssConstants.DEFAULT_PADDING } : {}),

    (paddingVertical && !isNaN(Number(paddingHorizontal)) ? { paddingVertical: Number(paddingVertical) } : {}),
    (paddingVertical && typeof paddingVertical === 'boolean' ? { paddingVertical: cssConstants.DEFAULT_PADDING } : {}),

    (paddingTop && !isNaN(Number(paddingTop)) ? { paddingTop: Number(paddingTop) } : {}),
    (paddingTop && typeof paddingTop === 'boolean' ? { paddingTop: cssConstants.DEFAULT_PADDING } : {}),

    (paddingBottom && !isNaN(Number(paddingBottom)) ? { paddingBottom: Number(paddingBottom) } : {}),
    (paddingBottom && typeof paddingBottom === 'boolean' ? { paddingBottom: cssConstants.DEFAULT_PADDING } : {}),

    (paddingLeft && !isNaN(Number(paddingLeft)) ? { paddingLeft: Number(paddingLeft) } : {}),
    (paddingLeft && typeof paddingLeft === 'boolean' ? { paddingLeft: cssConstants.DEFAULT_PADDING } : {}),

    (paddingRight && !isNaN(Number(paddingRight)) ? { paddingRight: Number(paddingRight) } : {}),
    (paddingRight && typeof paddingRight === 'boolean' ? { paddingRight: cssConstants.DEFAULT_PADDING } : {}),

    (margin && !isNaN(Number(margin)) ? { margin: Number(margin) } : {}),
    (margin && typeof margin === 'boolean' ? { margin: cssConstants.DEFAULT_MARGIN } : {}),

    (marginHorizontal && !isNaN(Number(marginHorizontal)) ? { marginHorizontal: Number(marginHorizontal) } : {}),
    (marginHorizontal && typeof marginHorizontal === 'boolean' ? { marginHorizontal: cssConstants.DEFAULT_MARGIN } : {}),

    (marginVertical && !isNaN(Number(marginVertical)) ? { marginVertical: Number(marginVertical) } : {}),
    (marginVertical && typeof marginVertical === 'boolean' ? { marginVertical: cssConstants.DEFAULT_MARGIN } : {}),

    (marginTop && !isNaN(Number(marginTop)) ? { marginTop: Number(marginTop) } : {}),
    (marginTop && typeof marginTop === 'boolean' ? { marginTop: cssConstants.DEFAULT_MARGIN } : {}),

    (marginBottom && !isNaN(Number(marginBottom)) ? { marginBottom: Number(marginBottom) } : {}),
    (marginBottom && typeof marginBottom === 'boolean' ? { marginBottom: cssConstants.DEFAULT_MARGIN } : {}),

    (marginLeft && !isNaN(Number(marginLeft)) ? { marginLeft: Number(marginLeft) } : {}),
    (marginLeft && typeof marginLeft === 'boolean' ? { marginLeft: cssConstants.DEFAULT_MARGIN } : {}),

    (marginRight && !isNaN(Number(marginRight)) ? { marginRight: Number(marginRight) } : {}),
    (marginRight && typeof marginRight === 'boolean' ? { marginRight: cssConstants.DEFAULT_MARGIN } : {}),

    (border ? commonStyles.border : {}),

    (full ? commonStyles.fullView : {}),
    viewProps.style]} >{viewProps.children}</View>
}