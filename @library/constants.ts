import { Platform } from "react-native";

export const constants = {
    IS_ENV_DEVELOPMENT: __DEV__,
    IS_ANDROID: Platform.OS === "android",
    IS_IOS: Platform.OS === "ios",
    IS_DEBUG_MODE_ENABLED: Boolean(window.navigator.userAgent),
    ATTACHMENT_SIZE: 10 * 1024 * 1024,
    TEXT_MAX_CHARS: 280,
    TEXT_MAX_HEIGHT: 50,
    SETION_KEYS: {
        OBSERVATION: 'obs',
        PRIORITY_ID: 'setId',
        SECTION: 'section',
        FIELD: 'field',
        DELETD_ATTACHMENTS: 'deletedAttachments[]'
    },
    CHIP_RADIUS: 8,
    KEYBOARD_HEIGHT: 216 // ideal ios mobile keyboard height
};

export const tagStyles = {
    p: {
        margin: '0px !important'
    },
    h1: {
        margin: '0px !important'
    },
    h2: {
        margin: '0px !important'
    },
    h3: {
        margin: '0px !important'
    },
    h4: {
        margin: '0px !important'
    },
    h5: {
        margin: '0px !important'
    },
    h6: {
        margin: '0px !important'
    },
    strong: {
        margin: '0px !important'
    },
    span: {
        margin: '0px !important'
    },
    ol: {
        margin: '0px !important',
    },
    ul: {
        margin: '0px !important',
    },
    li: {
        margin: '0px !important'
    },
    u: {
        margin: '0px !important'
    },
    s: {
        margin: '0px !important'
    }
}
