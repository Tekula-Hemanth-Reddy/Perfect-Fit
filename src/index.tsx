import React from "react";
import {
    StyleSheet,
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

interface MainInterface {
    selectedImage: number,
    showSelectedImage: boolean,
    selectedDimensions: {
        level: string;
        rows: number;
        columns: number;
    },
    completed: boolean;
    startTime: Date;
    timeTaken: string
}

export default class Main extends React.Component<{}, MainInterface> {
    images: { path: string, img: ImageSourcePropType }[] = [
        {
            path: 'camera',
            img: require('../assets/camera.jpg')
        },
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
    imgDimensions: {
        level: string;
        rows: number;
        columns: number;
    }[] = [
            {
                level: 'Beginner',
                rows: 3,
                columns: 3,
            },
            {
                level: 'Novice',
                rows: 4,
                columns: 3,
            },
            {
                level: 'Intermediate',
                rows: 4,
                columns: 4,
            },
            {
                level: 'Advanced',
                rows: 5,
                columns: 4,
            },
            {
                level: 'Expert',
                rows: 5,
                columns: 5,
            },
            {
                level: 'Master',
                rows: 6,
                columns: 5,
            },
        ]
    constructor(props: {}) {
        super(props)
        this.state = {
            selectedImage: -1,
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

    render() {
        return (
            <>
                {
                    (this.state.selectedImage == -1) ?
                        <RnView full paddingTop={100} paddingHorizontal>
                            <RnView padding>
                                <RnText title marginBottom textAlignCenter style={{ color: colors.SECONDARY.SECONDARY_900 }}>Select Image to Start the game</RnText>
                                <FlatList
                                    data={this.images}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    scrollEnabled={true}
                                    renderItem={(item) => <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
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
                            <RnView full justifyCenter marginBottom={50}>
                                <FlatList
                                    data={this.imgDimensions}
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
                                    <DragAndDrop path={this.images[this.state.selectedImage].path} rows={this.state.selectedDimensions.rows} columns={this.state.selectedDimensions.columns} completed={(completed: boolean) => { this.puzzelCompleted(completed) }} />
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
                                        onPress={() => { this.setState({ selectedImage: -1, completed: false }) }}
                                        warning
                                        text="Clear Selection"
                                        style={{ width: '45%' }}
                                    />
                                </RnView>
                            </RnView>
                            :
                            <Completed image={this.images[this.state.selectedImage].img} timeTaken={this.state.timeTaken} nextPuzzle={() => { this.setState({ selectedImage: -1, completed: false }) }} />
                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showSelectedImage}
                    onRequestClose={() => {
                        this.setState({ showSelectedImage: false })
                    }}>
                    <RnView style={styles.centeredView}>
                        <RnView style={styles.modalView}>
                            {(this.state.selectedImage != -1) &&
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
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setState({ showSelectedImage: false })}>
                                <RnText style={styles.textStyle}>Hide Image</RnText>
                            </Pressable>
                        </RnView>
                    </RnView>
                </Modal>
            </>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        marginTop: 20,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
