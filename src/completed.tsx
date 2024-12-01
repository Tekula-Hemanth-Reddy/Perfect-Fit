import React, { useEffect, useRef } from "react";
import {
    Animated,
    ImageSourcePropType,
} from "react-native";
import { RnView, RnText, RnButton } from "../@library";
import rnConstants from "../@library/config/rn-constants";
import { formatString } from "../helper";
import { rnStrings } from "../@library/config/rn-strings";

interface CompletedInterface {
    image: ImageSourcePropType,
    timeTaken: string,
    nextPuzzle: Function
}
export const Completed = (props: CompletedInterface) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the fade-in animation when the component is mounted
        Animated.timing(fadeAnim, {
            toValue: 1, // Final opacity value
            duration: 3000, // Duration of the animation (in milliseconds)
            useNativeDriver: true, // To optimize the animation using native driver
        }).start();
    }, [fadeAnim]);

    return <RnView full padding justifyCenter>
        <Animated.Image
            source={props.image}
            style={[
                {
                    width: '90%',
                    height: '70%',
                    resizeMode: 'stretch',
                    marginHorizontal: rnConstants.DEFAULT_MARGIN / 2,
                    borderRadius: 10,
                    opacity: fadeAnim
                },
            ]}
        />
        <RnText margin={rnConstants.DEFAULT_MARGIN * 2} title>
            {formatString(rnStrings.NEXT_LEVEL, props.timeTaken)}
        </RnText>
        <RnButton
            onPress={() => props.nextPuzzle()}
            text={rnStrings.NEXT_PUZZLE}
            success
            large
            style={{ width: '45%', alignSelf: 'center' }}
            textStyle={{ fontSize: rnConstants.LARGE_FONT_SIZE }}
        />
    </RnView>
}
