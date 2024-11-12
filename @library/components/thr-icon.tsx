import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import cssConstants from "../styles/css-constants";
import { ViewTHR } from './thr-view';
import { THRIconProps } from './types';



// search icons: "https://icons.expo.fyi/"

export function IconTHR({ name, color, size, ...iconProps }: THRIconProps) {
    const IconSize = size || cssConstants.ICON_SIZE;
    const [iconColor, setIconColor] = useState(color || cssConstants.TEXT_COLOR);
    useEffect(() => {
        setIconColor(color || cssConstants.TEXT_COLOR);
    }, [color]);
    return (
        <ViewTHR {...iconProps} style={[styles.container, iconProps.style]}>
            <MaterialIcons name={name as any} size={IconSize} color={iconColor} />
        </ViewTHR>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});