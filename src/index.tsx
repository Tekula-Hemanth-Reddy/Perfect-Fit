import React from "react";
import {
    FlatList,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    Modal,
    Pressable,
} from "react-native";
import DragAndDrop from "./drag_drop";
import { Completed } from "./completed";
import { getTimeDifference } from "../helper";
import { RnView, RnText, RnButton } from "../@library";
import colors from "../@library/config/rn-colors";
import rnConstants from "../@library/config/rn-constants";
import { rnLevel } from "../@library/config/levels";
import { imgDimensions } from "../@library/config/imageDimensions";
import AttachmentPicker from "./image-picker";
import { rnStyles } from "../@library/config/rn-styles";
import { ImageResult } from "expo-image-manipulator";

interface MainInterface {
    selectedImage: number,
    showSelectedImage: boolean,
    selectedDimensions: {
        level: string;
        rows: number;
        columns: number;
    },
    imageCapture?: ImageResult
    completed: boolean;
    startTime: Date;
    timeTaken: string;
}

export default class Main extends React.Component<{}, MainInterface> {
    img = {
        path: 'camera',
        img: require('../assets/camera.jpg')
    }
    images: { path: string, img: ImageSourcePropType }[] = [
        {
            path: 'first',
            img: require('../assets/img/first.jpeg')
        },
        {
            path: 'second',
            img: require('../assets/img/second.jpeg')
        },
        {
            path: 'third',
            img: require('../assets/img/third.jpeg')
        },
        {
            path: 'fourth',
            img: require('../assets/img/fourth.jpeg')
        },
        {
            path: 'fifth',
            img: require('../assets/img/fifth.jpeg')
        },
        {
            path: 'sixth',
            img: require('../assets/img/sixth.jpeg')
        }
    ]
    constructor(props: {}) {
        super(props)
        this.state = {
            selectedImage: -1,
            imageCapture: undefined,
            showSelectedImage: false,
            selectedDimensions: {
                level: 'Beginner',
                rows: 3,
                columns: 3,
            },
            completed: false,
            startTime: new Date(),
            timeTaken: ''
        }
    }

    puzzelCompleted = (completed: boolean) => {
        if (completed)
            this.setState({
                completed: completed,
                timeTaken: getTimeDifference(this.state.startTime, new Date())
            })
    }

    onImageSelect = (image: ImageResult) => {
        this.setState({
            selectedImage: -1,
            imageCapture: image,
            completed: false,
            startTime: new Date(),
        })
    }

    render() {
        return (
            <>
                {
                    ((this.state.selectedImage == -1) && !this.state.imageCapture) ?
                        <RnView full paddingTop={100} paddingHorizontal>
                            <RnView padding>
                                <RnText title marginBottom textAlignCenter style={{ color: colors.SECONDARY.SECONDARY_900 }}>Select Image to Start the game</RnText>
                                <RnView row>
                                    <AttachmentPicker onImageSelect={this.onImageSelect.bind(this)} />
                                    <FlatList
                                        data={this.images}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        scrollEnabled={true}
                                        renderItem={(item) => <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    imageCapture: undefined,
                                                    selectedImage: item.index,
                                                    completed: false,
                                                    startTime: new Date(),
                                                })
                                            }}
                                        >
                                            <Image
                                                source={item.item.img}
                                                style={[
                                                    {
                                                        width: 100,
                                                        height: 150,
                                                        resizeMode: 'stretch',
                                                        marginHorizontal: rnConstants.DEFAULT_MARGIN / 2,
                                                        borderRadius: 10
                                                    },
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        }
                                        scrollEventThrottle={16}
                                        keyExtractor={item => item.path}
                                    />
                                </RnView>
                            </RnView>
                            <RnView full justifyCenter marginBottom={50}>
                                <FlatList
                                    data={imgDimensions}
                                    ListHeaderComponent={<RnText title margin>{`Choosen Level : ${this.state.selectedDimensions.level}`}</RnText>}
                                    showsVerticalScrollIndicator={false}
                                    scrollEnabled={true}
                                    numColumns={3}
                                    renderItem={(item) => <RnView padding style={{
                                        width: '33%'
                                    }}>
                                        <RnButton
                                            onPress={() => {
                                                this.setState({
                                                    selectedDimensions: item.item
                                                })
                                            }}
                                            style={(this.state.selectedDimensions.level == item.item.level) ? {
                                                backgroundColor: rnLevel[item.item.level].backgroundColor,
                                                borderColor: rnLevel[item.item.level].backgroundColor
                                            } :
                                                {
                                                    backgroundColor: rnLevel[item.item.level].lightBackgroundColor,
                                                    borderColor: rnLevel[item.item.level].backgroundColor
                                                }}
                                            textStyle={{
                                                color: (this.state.selectedDimensions.level == item.item.level) ? rnConstants.WHITE_COLOR : rnConstants.BLACK_COLOR
                                            }}
                                            text={`${item.item.level}`} />
                                    </RnView>
                                    }
                                    scrollEventThrottle={16}
                                    keyExtractor={item => `${item.rows}#${item.columns}`}
                                />
                                <Image
                                    source={require('../assets/loading.gif')}
                                    style={[
                                        {
                                            width: '100%',
                                            height: '70%',
                                            resizeMode: 'stretch',
                                            marginHorizontal: rnConstants.DEFAULT_MARGIN / 2,
                                            borderRadius: 10
                                        },
                                    ]}
                                />
                            </RnView>
                        </RnView>
                        :
                        !this.state.completed ?
                            <RnView full>
                                <RnView full>
                                    {
                                        (this.state.selectedImage == -1) ?
                                            <DragAndDrop captureImage={this.state.imageCapture} rows={this.state.selectedDimensions.rows} columns={this.state.selectedDimensions.columns} completed={(completed: boolean) => { this.puzzelCompleted(completed) }} />
                                            :
                                            <DragAndDrop path={this.images[this.state.selectedImage].path} rows={this.state.selectedDimensions.rows} columns={this.state.selectedDimensions.columns} completed={(completed: boolean) => { this.puzzelCompleted(completed) }} />
                                    }
                                </RnView>
                                <RnView justifyBetween padding paddingBottom={50} row>
                                    <RnButton
                                        marginRight={rnConstants.DEFAULT_MARGIN / 2}
                                        onPress={() => { this.setState({ showSelectedImage: true }) }}
                                        secondary
                                        text="View Image"
                                        style={{ width: '45%' }}
                                    />
                                    <RnButton
                                        marginLeft={rnConstants.DEFAULT_MARGIN / 2}
                                        onPress={() => { this.setState({ selectedImage: -1, completed: false, imageCapture: undefined }) }}
                                        warning
                                        text="Clear Selection"
                                        style={{ width: '45%' }}
                                    />
                                </RnView>
                            </RnView>
                            :
                            <Completed image={
                                this.state.selectedImage == -1
                                    ?
                                    { uri: this.state.imageCapture?.uri }
                                    :
                                    this.images[this.state.selectedImage].img
                            } timeTaken={this.state.timeTaken} nextPuzzle={() => { this.setState({ selectedImage: -1, completed: false, imageCapture: undefined }) }} />
                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showSelectedImage}
                    onRequestClose={() => {
                        this.setState({ showSelectedImage: false })
                    }}>
                    <RnView style={rnStyles.centeredView}>
                        <RnView style={rnStyles.modalView}>
                            {(this.state.selectedImage == -1) ?
                                <Image
                                    source={{ uri: this.state.imageCapture?.uri }}
                                    style={[
                                        {
                                            width: 200,
                                            height: 250,
                                            resizeMode: 'stretch',
                                            marginHorizontal: rnConstants.DEFAULT_MARGIN / 2,
                                            borderRadius: 10
                                        },
                                    ]}
                                />
                                :
                                <Image
                                    source={this.images[this.state.selectedImage].img}
                                    style={[
                                        {
                                            width: 200,
                                            height: 250,
                                            resizeMode: 'stretch',
                                            marginHorizontal: rnConstants.DEFAULT_MARGIN / 2,
                                            borderRadius: 10
                                        },
                                    ]}
                                />
                            }
                            <Pressable
                                style={[rnStyles.previewButton]}
                                onPress={() => this.setState({ showSelectedImage: false })}>
                                <RnText style={rnStyles.previewTextStyle}>Hide Image</RnText>
                            </Pressable>
                        </RnView>
                    </RnView>
                </Modal>
            </>
        );
    }
}
