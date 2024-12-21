
import React from 'react';
import rnConstants from '../../@library/config/rn-constants';
import { RnButton, RnIcon, RnView } from '../../@library';




interface PFImageToolbarProps {
    onRetake: Function,
    onAccept: Function,
    onClose: Function,
}

export const PFImageToolbar = (props: PFImageToolbarProps) => {
    return <RnView row justifyBetween padding={rnConstants.DEFAULT_PADDING * 2} style={{ position: 'absolute', bottom: 0 }}>
        <RnButton style={{ height: rnConstants.TOOLBAR_HEIGHT }} transparent onPress={() => props.onClose()} iconLeft={<RnIcon
            name={'close'}
            size={rnConstants.ICON_SIZE_LARGE}
            color={rnConstants.WHITE_COLOR} />} />
        <RnButton style={{ height: rnConstants.TOOLBAR_HEIGHT }} transparent
            onPress={() => props.onRetake({ capture: undefined })} iconLeft={<RnIcon
                name={"refresh"}
                size={rnConstants.ICON_SIZE_LARGE}
                color={rnConstants.WHITE_COLOR} />} />
        <RnButton style={{ height: rnConstants.TOOLBAR_HEIGHT }} transparent onPress={() => props.onAccept()} iconLeft={
            <RnIcon
                name={"check"}
                size={rnConstants.ICON_SIZE_LARGE}
                color={rnConstants.WHITE_COLOR} />} />
    </RnView>
}
