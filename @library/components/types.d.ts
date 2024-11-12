import { ContentStyle } from "@shopify/flash-list";
import { ImageStyle, ModalProps, TextInputProps, TextProps, TextStyle, TouchableOpacityProps, ViewProps, ViewStyle } from "react-native";
import { WORKFLOW_ISSUE_ACTIONS, CommunicationFeatureType, IApprovalWorkflowLevel, IAttachment, IRoster, IUser, LABLE_POSITION, PickerOption, WORK_FLOW_TYPE, MimeTypes } from "../../models";
import { captureType } from "../../models/enum-types";
import { IMaterialReceipts } from "../../app/layout/features/(equipment-management)/constants/models";
import { SkeletonPlaceholderProps } from "./skeleton-content/type";


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

export interface THRViewProps extends ViewProps, DefaultStyleProps {
    row?: boolean;
    justifyCenter?: boolean;
    justifyStart?: boolean;
    justifyBetween?: boolean,
    justifyEnd?: boolean,
    border?: boolean;
    col?: boolean;
    full?: boolean;
}
export interface THRTextProps extends TextProps, DefaultStyleProps {
    fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
    italic?: boolean,
    note?: boolean,
    light?: boolean,
    title?: boolean,
    banner?: boolean
    textAlignCenter?: boolean,
    textAlignLeft?: boolean,
    textAlignRight?: boolean
    maxLinesToView?: number,
    full?: boolean
}
export interface THRIconProps extends ViewProps {
    name: string
    color?: string;
    size?: number;
}

export interface THRButtonProps extends TouchableOpacityProps, DefaultStyleProps {
    text?: string;
    textStyles?: TextStyle;
    // textStyle?: RnTextStyleProp;
    large?: boolean;
    small?: boolean;
    transparent?: boolean;
    outline?: boolean;
    // type?: 'filled' | 'outline' | 'transparent', // transparent is the priority over themed buttons
    // height?: 'small' | 'medium' | 'base' | 'large',//
    iconLeft?: JSX.Element
    iconRight?: JSX.Element,
    icon?: JSX.Element;
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
    textStyle?: TextProps.style,
    textProps?: THRTextProps,
    brightBorder?: boolean,
    isActionDone?: boolean, // this is to avoid multiple clicks
    onPress?: () => void, // onPress by default closes the alertModal. Override it if you want to change the functionality
    // theme?: 'primary' | 'secondary' | 'warning' | 'default' | 'success' | 'danger' | 'neutral';
}