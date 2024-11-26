import { MaterialIcons, FontAwesome, FontAwesome5, FontAwesome6, Feather, Entypo, EvilIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import rnConstants from "../../config/rn-constants";
import { RnView } from '../view';
import { RnIconProps } from '../../types';
import { rnStyles } from '../../config/rn-styles';



// search icons: "https://icons.expo.fyi/"

export function RnIcon({ type, name, color, size, ...iconProps }: RnIconProps) {
    const IconSize = size || rnConstants.ICON_SIZE;
    const [iconColor, setIconColor] = useState(color || rnConstants.TEXT_COLOR);
    useEffect(() => {
        setIconColor(color || rnConstants.TEXT_COLOR);
    }, [color]);

    const getIcon = () => {
        switch (type) {
            case 'FontAwesome':
                return <FontAwesome name={name as any} size={IconSize} color={iconColor} />
            case 'FontAwesome5':
                return <FontAwesome5 name={name as any} size={IconSize} color={iconColor} />
            case 'FontAwesome6':
                return <FontAwesome6 name={name as any} size={IconSize} color={iconColor} />
            case 'Feather':
                return <Feather name={name as any} size={IconSize} color={iconColor} />
            case 'Entypo':
                return <Entypo name={name as any} size={IconSize} color={iconColor} />
            case 'EvilIcons':
                return <EvilIcons name={name as any} size={IconSize} color={iconColor} />
            case 'Ionicons':
                return <Ionicons name={name as any} size={IconSize} color={iconColor} />
            case 'AntDesign':
                return <AntDesign name={name as any} size={IconSize} color={iconColor} />
            case 'MaterialIcons':
            default:
                return <MaterialIcons name={name as any} size={IconSize} color={iconColor} />
        }
    }
    return (
        <RnView {...iconProps} style={[rnStyles.iconContainer, iconProps.style]}>
            {
                getIcon()
            }
        </RnView>
    )
}