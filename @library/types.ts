
import React from 'react';
import { TextProps, TextStyle, TouchableOpacityProps, ViewProps } from "react-native";


export interface DefaultStyleProps {
    padding?: boolean | number;
    paddingHorizontal?: boolean | number;
    paddingVertical?: boolean | number;
    paddingLeft?: boolean | number;
    paddingRight?: boolean | number;
    paddingTop?: boolean | number;
    paddingBottom?: boolean | number;
    margin?: boolean | number;
    marginHorizontal?: boolean | number;
    marginVertical?: boolean | number;
    marginLeft?: boolean | number;
    marginRight?: boolean | number;
    marginTop?: boolean | number;
    marginBottom?: boolean | number;
}

export interface RnViewProps extends ViewProps, DefaultStyleProps {
    row?: boolean;
    justifyCenter?: boolean;
    justifyStart?: boolean;
    justifyBetween?: boolean,
    justifyEnd?: boolean,
    border?: boolean;
    col?: boolean;
    full?: boolean;
}
export interface RnTextProps extends TextProps, DefaultStyleProps {
    fontWeight?: TextStyle['fontWeight'],
    italic?: boolean,
    note?: boolean,
    light?: boolean,
    title?: boolean,
    banner?: boolean
    textAlignCenter?: boolean,
    textAlignLeft?: boolean,
    textAlignRight?: boolean
    full?: boolean
}

export interface RnButtonProps extends TouchableOpacityProps, DefaultStyleProps {
    text?: string;
    textStyles?: TextStyle;
    large?: boolean;
    small?: boolean;
    transparent?: boolean;
    outline?: boolean;
    iconLeft?: React.JSX.Element
    iconRight?: React.JSX.Element,
    icon?: React.JSX.Element;
    primary?: boolean;
    secondary?: boolean;
    warning?: boolean;
    success?: boolean;
    danger?: boolean;
    neutral?: boolean;
    justifyStart?: boolean;
    justifyEnd?: boolean,
    justifyBetween?: boolean,
    maxLinesToView?: number,
    numberOfLines?: number,
    textStyle?: TextStyle,
    textFontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
    textProps?: RnTextProps,
    brightBorder?: boolean,
    onPress?: () => void, // onPress by default closes the alertModal. Override it if you want to change the functionality
}

export interface RnIconProps extends ViewProps {
    type?: 'MaterialIcons' | "FontAwesome" | "FontAwesome5" | "FontAwesome6" | "Feather" | "Entypo" | "EvilIcons" | "Ionicons" | "AntDesign";
    name: string
    color?: string;
    size?: number;
}