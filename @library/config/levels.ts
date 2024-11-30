import colors from "./rn-colors";

export const rnLevel: {
    [key: string]: {
        backgroundColor: string,
        lightBackgroundColor: string,
    }
} = {
    Beginner: {
        backgroundColor: colors.SECONDARY.SECONDARY_200,
        lightBackgroundColor: colors.SECONDARY.SECONDARY_50,
    },
    Novice: {
        backgroundColor: colors.PRIMARY.PRIMARY_300,
        lightBackgroundColor: colors.PRIMARY.PRIMARY_50,
    },
    Intermediate: {
        backgroundColor: colors.DANGER.DANGER_200,
        lightBackgroundColor: colors.DANGER.DANGER_50,
    },
    Advanced: {
        backgroundColor: colors.SECONDARY.SECONDARY_600,
        lightBackgroundColor: colors.SECONDARY.SECONDARY_100,
    },
    Expert: {
        backgroundColor: colors.PRIMARY.PRIMARY_600,
        lightBackgroundColor: colors.PRIMARY.PRIMARY_100,
    },
    Master: {
        backgroundColor: colors.DANGER.DANGER_700,
        lightBackgroundColor: colors.DANGER.DANGER_100,
    },
}