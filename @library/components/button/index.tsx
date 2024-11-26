import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import rnConstants from "../../config/rn-constants";
import { RnButtonProps } from "../../types";
import { rnStyles } from "../../config/rn-styles";
import { buttonHeights, themeOptions } from "../../config/rn-button-constants";
import { RnText } from "../text";

const getTheme = (props: RnButtonProps) => {
    switch (true) {
        case props.primary:
            return themeOptions.primary;
        case props.secondary:
            return themeOptions.secondary;
        case props.neutral:
            return themeOptions.neutral;
        case props.success:
            return themeOptions.success;
        case props.warning:
            return themeOptions.warning;
        case props.danger:
            return themeOptions.danger;
        default:
            return themeOptions.default;
    }
}

export function RnButton(props: RnButtonProps) {
    const { text, large, small, outline, transparent, iconLeft: leftIcon, iconRight: rightIcon, icon, maxLinesToView, numberOfLines,
        primary,
        secondary,
        warning,
        success,
        danger,
        neutral,
        padding,
        paddingHorizontal,
        paddingTop,
        paddingBottom,
        paddingVertical,
        margin,
        marginHorizontal,
        marginVertical,
        marginTop,
        paddingLeft,
        paddingRight,
        marginLeft,
        marginRight,
        marginBottom,
        justifyStart,
        justifyEnd,
        justifyBetween,
        brightBorder,
        textStyle: textStyles,
        ...touchableOpacityProps } = props;


    let themeOption = getTheme(props);
    if (!outline && !transparent) {
        themeOption.borderColor = themeOption.borderColor
    }
    switch (true) {
        case small:
            themeOption.fontSize = rnConstants.SMALL_FONT_SIZE
            themeOption.padding = rnConstants.XXX_SMALL_PADDING
            break;
        case large:
            themeOption.fontSize = rnConstants.LARGE_FONT_SIZE
            themeOption.padding = rnConstants.XX_SMALL_PADDING
        default:
            themeOption.fontSize = rnConstants.BASE_FONT_SIZE
            themeOption.padding = rnConstants.DEFAULT_PADDING
            break;
    }

    return (
        <TouchableOpacity
            {...touchableOpacityProps}
            style={
                [
                    rnStyles.buttonContainer,
                    {
                        backgroundColor: transparent || outline ? 'transparent' : (props.disabled ? rnConstants.DISABLE_COLOR : themeOption.backgroundColor),
                        borderColor: props.disabled ? rnConstants.DISABLE_COLOR : props.brightBorder ? rnConstants.SECONDARY_COLOR : themeOption.borderColor,
                        borderWidth: transparent && !outline ? 0 : 1,
                        height: small ? buttonHeights['small'] : (large ? buttonHeights['large'] : buttonHeights['default']),
                        padding: themeOption.padding,
                        ...(leftIcon || rightIcon ? { justifyContent: 'center' } : {})
                    },

                    (justifyStart ? { justifyContent: 'flex-start' } : {}),
                    (justifyEnd ? { justifyContent: 'flex-end' } : {}),
                    (justifyBetween ? { justifyContent: 'space-between' } : {}),

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

                    touchableOpacityProps.style
                ]
            } onPress={() => {
                props.onPress?.();
            }} disabled={props.disabled}>


            {/* {rnButtonLeftIcon} */}
            {leftIcon ? React.cloneElement(leftIcon, { color: leftIcon.props.color ? leftIcon.props.color : themeOption.textColor }) : <></>}
            {icon ? React.cloneElement(icon, { color: icon.props.color ? icon.props.color : themeOption.textColor }) : <></>}
            {text && <RnText {...numberOfLines ? { numberOfLines } : {}} {...maxLinesToView ? { maxLinesToView: maxLinesToView } : {}} style={[{ color: outline ? themeOption.outlineTextColor : themeOption.textColor, fontSize: rnConstants.SMALL_FONT_SIZE }, { ...rnStyles.buttonText, ...(props.textStyle || {}) }]} {...props.textProps}>{text}</RnText>}
            {props.children}
            {/* {rnButtonRightIcon} */}
            {rightIcon ? React.cloneElement(rightIcon, { color: rightIcon.props.color ? rightIcon.props.color : themeOption.textColor }) : <></>}

        </TouchableOpacity>
    )
}