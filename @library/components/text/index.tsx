
import React from 'react';
import { Text as NativeText } from 'react-native';
import rnConstants from '../../config/rn-constants';
import { rnStyles } from '../../config/rn-styles';
import { RnTextProps } from '../../types';

enum FontWeights {
    Bold = 'Bold',
    SemiBold = 'SemiBold',
    Medium = 'Medium',
    Regular = 'Regular',
    Light = 'Light',
    ExtraLight = 'ExtraLight',
    Black = 'Black'
}

const fontWeights = {
    100: FontWeights.ExtraLight,
    200: FontWeights.Light,
    300: FontWeights.Light,
    400: FontWeights.Regular,
    500: FontWeights.Medium,
    600: FontWeights.SemiBold,
    700: FontWeights.Bold,
    800: FontWeights.Bold,
    900: FontWeights.Black
}

export function RnText({ fontWeight, italic, note, light, title,
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
    textAlignCenter: alignCenter,
    textAlignLeft: alignLeft,
    textAlignRight: alignRight,
    paddingLeft,
    paddingRight,
    marginLeft,
    marginRight,
    full,
    banner,
    ...textProps }: RnTextProps) {

    return <NativeText {...textProps} style={[
        {
            fontSize: rnConstants.BASE_FONT_SIZE,
            color: rnConstants.TEXT_COLOR
        }
        , { fontStyle: italic ? 'italic' : 'normal', fontWeight: fontWeight ? fontWeight : 'normal' },
        { ...(note ? { fontSize: rnConstants.SMALL_FONT_SIZE } : {}) },
        { ...(light ? { color: rnConstants.LIGHT_TEXT_COLOR } : {}) },
        { ...(title ? { fontSize: rnConstants.MEDIUM_FONT_SIZE, color: rnConstants.SECONDARY_COLOR } : {}) },

        (alignCenter ? rnStyles.textAlignCenter : {}),
        (alignLeft ? rnStyles.textAlignLeft : {}),
        (alignRight ? rnStyles.textAlignRight : {}),
        (full ? { flex: 1 } : {}),
        (padding && !isNaN(Number(padding)) ? { padding: Number(padding) } : {}),
        (padding && typeof padding === 'boolean' ? { padding: rnConstants.DEFAULT_PADDING } : {}),

        (paddingHorizontal && !isNaN(Number(paddingHorizontal)) ? { paddingHorizontal: Number(paddingHorizontal) } : {}),
        (paddingHorizontal && typeof paddingHorizontal === 'boolean' ? { paddingHorizontal: rnConstants.DEFAULT_PADDING } : {}),

        (paddingVertical && !isNaN(Number(paddingVertical)) ? { paddingVertical: Number(paddingVertical) } : {}),
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

        textProps.style]}
    />
}
