import React from "react";
import {
    FlatList,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    Modal,
    Dimensions
} from "react-native";
import { Completed } from "./completed";
import { formatString, getTimeDifference } from "../helper";
import { RnView, RnText, RnButton } from "../@library";
import colors from "../@library/config/rn-colors";
import rnConstants from "../@library/config/rn-constants";
import { rnLevel } from "../@library/config/levels";
import { imgDimensions } from "../@library/config/imageDimensions";
import AttachmentPicker from "./image-picker";
import { rnStyles } from "../@library/config/rn-styles";
import { ImageResult } from "expo-image-manipulator";
import { rnStrings } from "../@library/config/rn-strings";
import DragAndDrop from "./drag_drop";
import Timer from "./timer";

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
    dimension: {
        width: number,
        height: number,
    } = {
            width: 0,
            height: 0
        }
    constructor(props: {}) {
        super(props)
        this.dimension = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        }
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

    private puzzelCompleted = (completed: boolean) => {
        if (completed)
            this.setState({
                completed: completed,
                timeTaken: getTimeDifference(this.state.startTime, new Date())
            })
    }

    private onImageSelect = (image: ImageResult) => {
        this.setState({
            selectedImage: -1,
            imageCapture: image,
            completed: false,
            startTime: new Date(),
        })
    }

    private onPreImageSelect = (imgIndex: number) => {
        this.setState({
            imageCapture: undefined,
            selectedImage: imgIndex,
            completed: false,
            startTime: new Date(),
        })
    }

    private clearImageSelection = () => [
        this.setState({
            selectedImage: -1,
            completed: false,
            imageCapture: undefined
        })
    ]

    private getSelectedImage = () => {
        return (
            this.state.selectedImage == -1
                ?
                { uri: this.state.imageCapture?.uri }
                :
                this.images[this.state.selectedImage].img
        )
    }

    private setSelectedImage = (selected: boolean) => {
        this.setState({ showSelectedImage: selected })
    }

    renderMainScreen = () => {
        return <RnView full paddingHorizontal style={{ paddingTop: '20%' }}>
            <RnView padding>
                <RnText
                    title
                    marginBottom
                    textAlignCenter
                    style={{ color: colors.SECONDARY.SECONDARY_900 }}>
                    {rnStrings.SELECT_IMAGE_TO_START_GAME}
                </RnText>
                <RnView row>
                    <AttachmentPicker onImageSelect={this.onImageSelect.bind(this)} />
                    <FlatList
                        data={this.images}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={true}
                        renderItem={(item) => <TouchableOpacity
                            onPress={this.onPreImageSelect.bind(this, item.index)}
                        >
                            <Image
                                source={item.item.img}
                                style={rnStyles.imagePicker}
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
                    ListHeaderComponent={<RnText title margin>{formatString(rnStrings.CHOOSEN_LEVEL, this.state.selectedDimensions.level)}</RnText>}
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
                                borderColor: rnLevel[item.item.level].backgroundColor,
                            } :
                                {
                                    backgroundColor: rnLevel[item.item.level].lightBackgroundColor,
                                    borderColor: rnLevel[item.item.level].backgroundColor
                                }}
                            textStyle={{
                                color: (this.state.selectedDimensions.level == item.item.level) ? rnLevel[item.item.level].textColor : rnLevel[item.item.level].lightTextColor
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
                        rnStyles.imagePicker,
                        {
                            width: '100%',
                            height: '60%',
                        }
                    ]}
                />
            </RnView>
        </RnView>
    }

    renderDragAndDrop = () => {
        return <RnView full>
            <RnView full>
                {
                    (this.state.selectedImage == -1) ?
                        <DragAndDrop
                            captureImage={this.state.imageCapture}
                            rows={this.state.selectedDimensions.rows}
                            columns={this.state.selectedDimensions.columns}
                            completed={this.puzzelCompleted.bind(this)} />
                        :
                        <DragAndDrop
                            path={this.images[this.state.selectedImage].path}
                            rows={this.state.selectedDimensions.rows}
                            columns={this.state.selectedDimensions.columns}
                            completed={this.puzzelCompleted.bind(this)} />
                }
            </RnView>
            <Timer currentTime={this.state.startTime} />
            <RnView justifyBetween padding paddingBottom={50} row>
                <RnButton
                    marginRight={rnConstants.DEFAULT_MARGIN / 2}
                    onPress={this.setSelectedImage.bind(this, true)}
                    secondary
                    text={rnStrings.VIEW_IMAGE}
                    style={{ width: '45%' }}
                />
                <RnButton
                    marginLeft={rnConstants.DEFAULT_MARGIN / 2}
                    onPress={this.clearImageSelection.bind(this)}
                    warning
                    text={rnStrings.CLEAR_SELECTION}
                    style={{ width: '45%' }}
                />
            </RnView>
        </RnView>
    }

    render() {
        return (
            <>
                {
                    ((this.state.selectedImage == -1) && !this.state.imageCapture) ?
                        this.renderMainScreen()
                        :
                        !this.state.completed ?
                            this.renderDragAndDrop()
                            :
                            <Completed image={this.getSelectedImage()}
                                timeTaken={this.state.timeTaken}
                                nextPuzzle={this.clearImageSelection.bind(this)}
                            />
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showSelectedImage}
                    onRequestClose={this.setSelectedImage.bind(this, false)}>
                    <RnView style={rnStyles.centeredView}>
                        <RnView style={rnStyles.modalView}>
                            <Image
                                source={this.getSelectedImage()}
                                style={[
                                    rnStyles.imagePicker,
                                    {
                                        width: this.dimension.width / 1.5,
                                        height: this.dimension.height / 2
                                    }
                                ]}
                            />
                            <RnButton
                                marginTop
                                text={rnStrings.HIDE_IMAGE}
                                secondary
                                large
                                onPress={this.setSelectedImage.bind(this, false)}
                            />
                        </RnView>
                    </RnView>
                </Modal>
            </>
        );
    }
}
