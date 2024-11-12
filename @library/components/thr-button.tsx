import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { default as cssConstants, default as innConstants } from "../styles/css-constants";
import { TextTHR } from "./thr-text";
import { THRButtonProps } from "./types";
import colors from "../styles/colors";


const themeOptions = {
    primary: {
        backgroundColor: innConstants.PRIMARY_COLOR,
        textColor: cssConstants.WHITE_COLOR,
        outlineTextColor: colors.PRIMARY.PRIMARY_900,
        borderColor: innConstants.PRIMARY_COLOR,
        fontSize: innConstants.MEDIUM_FONT_SIZE,
        padding: innConstants.X_SMALL_PADDING,
    },
    secondary: {
        backgroundColor: innConstants.SECONDARY_COLOR,
        outlineTextColor: colors.SECONDARY.SECONDARY_900,
        textColor: cssConstants.WHITE_COLOR,
        borderColor: innConstants.SECONDARY_COLOR,
        fontSize: innConstants.MEDIUM_FONT_SIZE,
        padding: innConstants.X_SMALL_PADDING,
    },
    warning: {
        backgroundColor: colors.DANGER.DANGER_900,
        textColor: cssConstants.WHITE_COLOR,
        outlineTextColor: colors.DANGER.DANGER_900,
        borderColor: colors.DANGER.DANGER_900,
        fontSize: innConstants.MEDIUM_FONT_SIZE,
        padding: innConstants.X_SMALL_PADDING,
    },
    default: {
        backgroundColor: '#F8FAFA',
        textColor: cssConstants.TEXT_COLOR,
        outlineTextColor: cssConstants.TEXT_COLOR,
        borderColor: '#E1E3E3',
        fontSize: innConstants.MEDIUM_FONT_SIZE,
        padding: innConstants.X_SMALL_PADDING,
    },
    success: {
        backgroundColor: '#5CC870',
        textColor: cssConstants.WHITE_COLOR,
        outlineTextColor: colors.SUCCESS.SUCCESS_900,
        borderColor: '#5CC870',
        fontSize: innConstants.MEDIUM_FONT_SIZE,
        padding: innConstants.X_SMALL_PADDING,
    },
    danger: {
        backgroundColor: '#FDEFEE',
        textColor: '#D05656',
        outlineTextColor: colors.DANGER.DANGER_900,
        borderColor: '#D05656',
        fontSize: innConstants.MEDIUM_FONT_SIZE,
        padding: innConstants.X_SMALL_PADDING,
    },
    neutral: {
        backgroundColor: colors.SECONDARY.SECONDARY_50,
        textColor: cssConstants.TEXT_COLOR,
        outlineTextColor: colors.NEUTRAL.NEUTRAL_900,
        borderColor: '#E1E3E3',
        fontSize: innConstants.MEDIUM_FONT_SIZE,
        padding: innConstants.X_SMALL_PADDING,
    }
}

const buttonHeights = {
    small: 28,
    default: cssConstants.INPUT_HEIGHT,
    large: cssConstants.INPUT_HEIGHT + 4
}

const getTheme = (props: THRButtonProps) => {
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

export function ButtonTHR(props: THRButtonProps) {
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
        isActionDone,
        textStyle: textStyles,
        ...touchableOpacityProps } = props;


    const [reRender, setReRender] = useState<boolean>(false)
    const isSaving = useRef(false);

    useEffect(() => {
        if (isActionDone && isSaving.current) {
            isSaving.current = false;
            setReRender(!reRender)
        }
    }, [isSaving.current, isActionDone]);

    // let themeOption = Object.assign({}, themeOptions[theme] || themeOptions.default);
    let themeOption = getTheme(props);
    // const innButtonLeftIcon = leftIcon || <></>
    // const innButtonRightIcon = rightIcon || <></>
    if (!outline && !transparent) {
        themeOption.borderColor = themeOption.borderColor
    }
    switch (true) {
        case small:
            themeOption.fontSize = innConstants.SMALL_FONT_SIZE
            themeOption.padding = innConstants.XXX_SMALL_PADDING
            break;
        case large:
            themeOption.fontSize = innConstants.LARGE_FONT_SIZE
            themeOption.padding = innConstants.XX_SMALL_PADDING
        default:
            themeOption.fontSize = innConstants.BASE_FONT_SIZE
            themeOption.padding = innConstants.X_SMALL_PADDING
            break;
    }

    return (
        <TouchableOpacity
            {...touchableOpacityProps}
            style={
                [
                    styles.container,
                    {
                        backgroundColor: transparent || outline ? 'transparent' : (props.disabled ? cssConstants.DISABLE_COLOR : themeOption.backgroundColor),
                        borderColor: props.disabled ? cssConstants.DISABLE_COLOR : props.brightBorder ? cssConstants.SECONDARY_COLOR : themeOption.borderColor,
                        borderWidth: transparent && !outline ? 0 : 1,
                        height: small ? buttonHeights['small'] : (large ? buttonHeights['large'] : buttonHeights['default']),
                        padding: themeOption.padding,
                        ...(leftIcon || rightIcon ? { justifyContent: 'center' } : {})
                    },

                    (justifyStart ? { justifyContent: 'flex-start' } : {}),
                    (justifyEnd ? { justifyContent: 'flex-end' } : {}),
                    (justifyBetween ? { justifyContent: 'space-between' } : {}),

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

                    touchableOpacityProps.style
                ]
            } onPress={() => {
                if ('isActionDone' in props) {
                    if (!isSaving.current) {
                        isSaving.current = true;
                        props.onPress?.();
                    }
                } else {
                    props.onPress?.();
                }
            }} disabled={props.disabled || isSaving.current}>

            <>
                {/* {innButtonLeftIcon} */}
                {leftIcon ? React.cloneElement(leftIcon, { color: leftIcon.props.color ? leftIcon.props.color : themeOption.textColor }) : <></>}
                {icon ? React.cloneElement(icon, { color: icon.props.color ? icon.props.color : themeOption.textColor }) : <></>}
                {text && <TextTHR fontWeight={props.textStyle?.fontWeight ? props.textStyle?.fontWeight : 400} {...numberOfLines ? { numberOfLines } : {}} {...maxLinesToView ? { maxLinesToView: maxLinesToView } : {}} style={[{ color: outline ? themeOption.outlineTextColor : themeOption.textColor, fontSize: cssConstants.SMALL_FONT_SIZE }, { ...styles.buttonText, ...(props.textStyle || {}) }]} {...props.textProps}>{text}</TextTHR>}
                {props.children}
                {/* {innButtonRightIcon} */}
                {rightIcon ? React.cloneElement(rightIcon, { color: rightIcon.props.color ? rightIcon.props.color : themeOption.textColor }) : <></>}
            </>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: innConstants.INPUT_BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        lineHeight: 24,
    }
});