
import React, { useEffect, useState } from 'react';
import { Text as NativeText } from 'react-native';
import { strings } from '../strings';
import colors from '../styles/colors';
import { default as cssConstants, default as innConstants } from '../styles/css-constants';
import { commonStyles } from '../styles/styles';
import { ViewTHR } from './thr-view';
import { THRTextProps } from './types';


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

export function TextTHR({ fontWeight, italic, note, light, title,
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
    ...textProps }: THRTextProps) {

    const [text, setText] = useState(textProps.children)
    const [toggleViewMore, setToggleViewMore] = useState(false)
    const [showFullText, setShowFullText] = useState(false)


    useEffect(() => {
        setText(textProps.children);
        setToggleViewMore(false);
    }, [textProps.children]);

    const nativeText = <NativeText {...textProps} style={[
        {
            fontFamily: `Inter-${fontWeights[fontWeight || 400]}`,
            fontSize: cssConstants.BASE_FONT_SIZE,
            color: cssConstants.TEXT_COLOR
        }
        , { fontStyle: italic ? 'italic' : 'normal', fontWeight: fontWeight ? `${fontWeight}` : 'normal' },
        { ...(note ? { fontSize: innConstants.SMALL_FONT_SIZE } : {}) },
        { ...(light ? { color: cssConstants.LIGHT_TEXT_COLOR } : {}) },
        { ...(title ? { fontSize: cssConstants.MEDIUM_FONT_SIZE, color: colors.SECONDARY.SECONDARY_500 } : {}) },
        { ...(banner ? { fontFamily: `PlusJakartaSans-${fontWeights[fontWeight || 600]}` } : {}) },

        (alignCenter ? commonStyles.textAlignCenter : {}),
        (alignLeft ? commonStyles.textAlignLeft : {}),
        (alignRight ? commonStyles.textAlignRight : {}),
        (full ? { flex: 1 } : {}),
        (padding && !isNaN(Number(padding)) ? { padding: Number(padding) } : {}),
        (padding && typeof padding === 'boolean' ? { padding: cssConstants.DEFAULT_PADDING } : {}),

        (paddingHorizontal && !isNaN(Number(paddingHorizontal)) ? { paddingHorizontal: Number(paddingHorizontal) } : {}),
        (paddingHorizontal && typeof paddingHorizontal === 'boolean' ? { paddingHorizontal: cssConstants.DEFAULT_PADDING } : {}),

        (paddingVertical && !isNaN(Number(paddingVertical)) ? { paddingVertical: Number(paddingVertical) } : {}),
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

        textProps.style]}

    />

    if (textProps.maxLinesToView && (typeof textProps.maxLinesToView === 'number')) {
        return <ViewTHR full style={{ backgroundColor: cssConstants.TRANSPARENT_COLOR }}>
            {nativeText}
            {
                toggleViewMore && <NativeText children={showFullText ? strings.VIEW_LESS : strings.VIEW_MORE}
                    onPress={() => setShowFullText(!showFullText)}
                    style={[{ color: colors.BLUE }, !showFullText ? { position: 'absolute', bottom: 0, right: 0 } : {}]} />
            }
        </ViewTHR>
    }
    else {
        return nativeText
    }
}
