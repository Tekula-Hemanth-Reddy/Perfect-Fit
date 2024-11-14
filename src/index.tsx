import React from "react";
import {
    StyleSheet,
    FlatList,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native";
import { ButtonTHR, TextTHR, ViewTHR } from "../@library";
import cssConstants from "../@library/styles/css-constants";
import DragAndDrop from "./drag_drop";
import colors from "../@library/styles/colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Completed } from "./completed";
import { getTimeDifference } from "../helper";

interface MainInterface {
    selectedImage: number,
    showSelectedImage: boolean,
    selectedDimensions: {
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
        rows: number;
        columns: number;
    }[] = [
            {
                rows: 3,
                columns: 3,
            },
            {
                rows: 4,
                columns: 3,
            },
            {
                rows: 4,
                columns: 4,
            },
            {
                rows: 5,
                columns: 4,
            },
            {
                rows: 5,
                columns: 5,
            },
            {
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
                        <ViewTHR full paddingTop={100} paddingHorizontal>
                            <ViewTHR padding>
                                <TextTHR title marginBottom textAlignCenter style={{ color: colors.SECONDARY.SECONDARY_900 }}>Select Image to Start the game</TextTHR>
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
                                                    marginHorizontal: cssConstants.DEFAULT_MARGIN / 2,
                                                    borderRadius: 10
                                                },
                                            ]}
                                        />
                                    </TouchableOpacity>
                                    }
                                    scrollEventThrottle={16}
                                    keyExtractor={item => item.path}
                                />
                            </ViewTHR>
                            <ViewTHR full justifyCenter marginBottom={50}>
                                <FlatList
                                    data={this.imgDimensions}
                                    ListHeaderComponent={<TextTHR title margin>Dimensions</TextTHR>}
                                    showsVerticalScrollIndicator={false}
                                    scrollEnabled={true}
                                    numColumns={3}
                                    renderItem={(item) => <ViewTHR padding style={{
                                        width: '33%'
                                    }}>
                                        <ButtonTHR
                                            onPress={() => {
                                                this.setState({
                                                    selectedDimensions: item.item
                                                })
                                            }}
                                            secondary={this.state.selectedDimensions.rows == item.item.rows && this.state.selectedDimensions.columns == item.item.columns}
                                            text={`${item.item.rows} X ${item.item.columns}`} />
                                    </ViewTHR>
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
                                            marginHorizontal: cssConstants.DEFAULT_MARGIN / 2,
                                            borderRadius: 10
                                        },
                                    ]}
                                />
                            </ViewTHR>
                        </ViewTHR>
                        :
                        !this.state.completed ?
                            <ViewTHR full>
                                <ViewTHR full>
                                    <DragAndDrop path={this.images[this.state.selectedImage].path} rows={this.state.selectedDimensions.rows} columns={this.state.selectedDimensions.columns} completed={(completed: boolean) => { this.puzzelCompleted(completed) }} />
                                </ViewTHR>
                                <ViewTHR justifyBetween padding paddingBottom={50} row>
                                    <ButtonTHR
                                        marginRight={cssConstants.DEFAULT_MARGIN / 2}
                                        onPress={() => { this.setState({ showSelectedImage: true }) }}
                                        secondary
                                        text="View Image"
                                        style={{ width: '45%' }}
                                    />
                                    <ButtonTHR
                                        marginLeft={cssConstants.DEFAULT_MARGIN / 2}
                                        onPress={() => { this.setState({ selectedImage: -1, completed: false }) }}
                                        warning
                                        text="Clear Selection"
                                        style={{ width: '45%' }}
                                    />
                                </ViewTHR>
                            </ViewTHR>
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
                    <ViewTHR style={styles.centeredView}>
                        <ViewTHR style={styles.modalView}>
                            {(this.state.selectedImage != -1) &&
                                <Image
                                    source={this.images[this.state.selectedImage].img}
                                    style={[
                                        {
                                            width: 200,
                                            height: 250,
                                            resizeMode: 'stretch',
                                            marginHorizontal: cssConstants.DEFAULT_MARGIN / 2,
                                            borderRadius: 10
                                        },
                                    ]}
                                />
                            }
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setState({ showSelectedImage: false })}>
                                <TextTHR style={styles.textStyle}>Hide Image</TextTHR>
                            </Pressable>
                        </ViewTHR>
                    </ViewTHR>
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
