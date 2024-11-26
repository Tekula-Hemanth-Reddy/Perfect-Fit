import React from "react";
import { View } from "react-native";
import rnConstants from "../../config/rn-constants";
import { rnStyles } from "../../config/rn-styles";
import { RnViewProps } from '../../types'


export function RnView({
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
    border, ...viewProps }: RnViewProps) {
    return <View {...viewProps} style={[rnStyles.background_transperent,
    (row ? rnStyles.row : {}),
    (justifyBetween ? rnStyles.rowSpaceBetween : {}),
    (justifyCenter ? rnStyles.centerAlign : {}),
    (justifyEnd ? rnStyles.rowFlexEnd : {}),
    (justifyStart ? rnStyles.rowFlexStart : {}),


    (col ? rnStyles.col : {}),

    (padding && !isNaN(Number(padding)) ? { padding: Number(padding) } : {}),
    (padding && typeof padding === 'boolean' ? { padding: rnConstants.DEFAULT_PADDING } : {}),

    (paddingHorizontal && !isNaN(Number(paddingHorizontal)) ? { paddingHorizontal: Number(paddingHorizontal) } : {}),
    (paddingHorizontal && typeof paddingHorizontal === 'boolean' ? { paddingHorizontal: rnConstants.DEFAULT_PADDING } : {}),

    (paddingVertical && !isNaN(Number(paddingHorizontal)) ? { paddingVertical: Number(paddingVertical) } : {}),
    (paddingVertical && typeof paddingVertical === 'boolean' ? { paddingVertical: rnConstants.DEFAULT_PADDING } : {}),

    (paddingTop && !isNaN(Number(paddingTop)) ? { paddingTop: Number(paddingTop) } : {}),
    (paddingTop && typeof paddingTop === 'boolean' ? { paddingTop: rnConstants.DEFAULT_PADDING } : {}),

    (paddingBottom && !isNaN(Number(paddingBottom)) ? { paddingBottom: Number(paddingBottom) } : {}),
    (paddingBottom && typeof paddingBottom === 'boolean' ? { paddingBottom: rnConstants.DEFAULT_PADDING } : {}),

    (paddingLeft && !isNaN(Number(paddingLeft)) ? { paddingLeft: Number(paddingLeft) } : {}),
    (paddingLeft && typeof paddingLeft === 'boolean' ? { paddingLeft: rnConstants.DEFAULT_PADDING } : {}),

    (paddingRight && !isNaN(Number(paddingRight)) ? { paddingRight: Number(paddingRight) } : {}),
    (paddingRight && typeof paddingRight === 'boolean' ? { paddingRight: rnConstants.DEFAULT_PADDING } : {}),

    (margin && !isNaN(Number(margin)) ? { margin: Number(margin) } : {}),
    (margin && typeof margin === 'boolean' ? { margin: rnConstants.DEFAULT_MARGIN } : {}),

    (marginHorizontal && !isNaN(Number(marginHorizontal)) ? { marginHorizontal: Number(marginHorizontal) } : {}),
    (marginHorizontal && typeof marginHorizontal === 'boolean' ? { marginHorizontal: rnConstants.DEFAULT_MARGIN } : {}),

    (marginVertical && !isNaN(Number(marginVertical)) ? { marginVertical: Number(marginVertical) } : {}),
    (marginVertical && typeof marginVertical === 'boolean' ? { marginVertical: rnConstants.DEFAULT_MARGIN } : {}),

    (marginTop && !isNaN(Number(marginTop)) ? { marginTop: Number(marginTop) } : {}),
    (marginTop && typeof marginTop === 'boolean' ? { marginTop: rnConstants.DEFAULT_MARGIN } : {}),

    (marginBottom && !isNaN(Number(marginBottom)) ? { marginBottom: Number(marginBottom) } : {}),
    (marginBottom && typeof marginBottom === 'boolean' ? { marginBottom: rnConstants.DEFAULT_MARGIN } : {}),

    (marginLeft && !isNaN(Number(marginLeft)) ? { marginLeft: Number(marginLeft) } : {}),
    (marginLeft && typeof marginLeft === 'boolean' ? { marginLeft: rnConstants.DEFAULT_MARGIN } : {}),

    (marginRight && !isNaN(Number(marginRight)) ? { marginRight: Number(marginRight) } : {}),
    (marginRight && typeof marginRight === 'boolean' ? { marginRight: rnConstants.DEFAULT_MARGIN } : {}),

    (border ? rnStyles.border : {}),

    (full ? rnStyles.fullView : {}),
    viewProps.style]} >{viewProps.children}</View>
}