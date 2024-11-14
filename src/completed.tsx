import React, { useEffect, useRef } from "react";
import {
    Animated,
    Image,
    ImageSourcePropType,
} from "react-native";
import { ButtonTHR, TextTHR, ViewTHR } from "../@library";
import cssConstants from "../@library/styles/css-constants";

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

    return <ViewTHR full padding justifyCenter>
        <Animated.Image
            source={props.image}
            style={[
                {
                    width: '90%',
                    height: '70%',
                    resizeMode: 'stretch',
                    marginHorizontal: cssConstants.DEFAULT_MARGIN / 2,
                    borderRadius: 10,
                    opacity: fadeAnim
                },
            ]}
        />
        <TextTHR>Hey 👋! Congratulations on completing the puzzle! It took you {props.timeTaken} to finish. Click on <TextTHR title>Next Puzzle</TextTHR> to start the next challenge!</TextTHR>
        <ButtonTHR onPress={() => props.nextPuzzle()} marginTop text="Next Puzzle" success style={{ width: '45%', alignSelf: 'center' }} />
    </ViewTHR>
}
