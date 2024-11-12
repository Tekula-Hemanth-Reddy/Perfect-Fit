import React from "react";
import {
    StyleSheet,
    FlatList,
    PanResponder,
    PanResponderInstance,
    Animated,
    Dimensions,
    Image
} from "react-native";
import { TextTHR, ViewTHR } from "../@library";
import colors from "../@library/styles/colors";
import cssConstants from "../@library/styles/css-constants";
import { assets, getImagesArray } from "../helper";

const emoji: {
    [key: number]: {
        emoji: any,
        color: string
    }
} = {
    1: {
        emoji: '😈',
        color: colors.SUCCESS.SUCCESS_100
    },
    2: {
        emoji: '🦊',
        color: colors.SECONDARY.SECONDARY_100
    },
    3: {
        emoji: '🐷',
        color: colors.DANGER.DANGER_100
    },
    4: {
        emoji: '🐶',
        color: colors.NEUTRAL.NEUTRAL_100
    }
}

function getRandomEmoji() {
    const d = Math.floor(Math.random() * 4)
    return emoji[d + 1];
}

const colorMap: {
    [key: string]: {
        emoji: any,
        color: string
    }
} = {};

interface DragStateInterface {
    imgData: React.JSX.Element[][]
    dragging: boolean,
    parentIdx: number,
    childIdx: number,
    loading: boolean
}

interface DragPropInterface {
    path: string,
    rows: number,
    columns: number,
}

export default class DragAndDrop extends React.Component<DragPropInterface, DragStateInterface> {

    paddingTop: number = 100;
    paddingLeft: number = 15;

    rows: number = 3;
    columns: number = 3;

    // currentPositions
    _selected: { _x: number, _y: number } = { _x: -1, _y: -1 }
    _current: { _x: number, _y: number } = { _x: -1, _y: -1 }

    // dimensions of the view
    rowHeight = 0;
    rowWidth = 0;

    _panResponder: PanResponderInstance;
    point = new Animated.ValueXY();


    // offsets
    flatlistTopOffset = 0;
    flatlistLeftOffset = 0;

    constructor(props: DragPropInterface) {
        super(props);

        const arrayData: string[][] = Array.from(Array(this.columns), (_, i) => {
            return [];
        }).map((num, index) => Array.from(Array(this.rows), (_, i) => {
            colorMap[`${index}_${i}`] = getRandomEmoji()
            return `${index}_${i}`
        }))
        this.rows = this.props.rows,
            this.columns = this.props.columns

        this.rowHeight = Dimensions.get('window').height / (this.rows + 2);
        this.rowWidth = Dimensions.get('window').width / (this.columns + 0.3);

        this.state = {
            imgData: [],
            dragging: false,
            parentIdx: -1,
            childIdx: -1,
            loading: true
        }

        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // need to calculate parent and child indices
                const parentIdx = this.getIndex(gestureState.x0, this.flatlistLeftOffset, this.rowWidth, this.columns)
                const childIdx = this.getIndex(gestureState.y0, this.flatlistTopOffset, this.rowHeight, this.rows);
                this._selected = {
                    _x: gestureState.x0,
                    _y: gestureState.y0,
                }
                this._current = this._selected

                this.animatePoint({
                    _x: (parentIdx * this.rowWidth) + this.flatlistLeftOffset,
                    _y: (childIdx * this.rowHeight) + this.flatlistTopOffset
                })

                this.setState({
                    dragging: true,
                    parentIdx: parentIdx,
                    childIdx: childIdx
                }, () => {
                    this.animateList()
                })
            },
            onPanResponderMove: (evt, gestureState) => {
                if (!this.state.dragging)
                    return
                this._current = {
                    _x: gestureState.moveX,
                    _y: gestureState.moveY,
                }

                const { _xtravelled, _ytravelled } = this.travelDistance()

                if (_xtravelled < _ytravelled) {
                    this.animateY(this.traversalPoint(
                        this._current._y,
                        this._selected._y,
                        this.rowHeight,
                        this.flatlistTopOffset,
                        this.state.childIdx,
                        this.rows
                    ))
                }
                else if (_xtravelled > _ytravelled) {
                    this.animateX(this.traversalPoint(
                        this._current._x,
                        this._selected._x,
                        this.rowWidth,
                        this.flatlistLeftOffset,
                        this.state.parentIdx,
                        this.columns
                    ))
                }
                else {
                    this.animatePoint(this._current)
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderRelease: (evt, gestureState) => {
                this.reset();
            },
            onPanResponderTerminate: (evt, gestureState) => {
                this.reset();
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            }
        });

    }

    componentDidMount(): void {
        this.getShuffledImages()
    }

    async getShuffledImages() {
        const arr = await getImagesArray(assets[this.props.path], this.rowHeight, this.rowWidth, this.rows, this.columns)
        const result: React.JSX.Element[][] = []
        for (let i = 0; i < arr.length; i += this.rows) {
            result.push(arr.slice(i, i + this.rows)); // Slice the array into subarrays of size `columns`
        }
        this.setState({
            loading: false,
            imgData: result
        })
    }

    componentDidUpdate(prevProps: Readonly<DragPropInterface>, prevState: Readonly<DragStateInterface>, snapshot?: any): void {
        if (this.props.path != prevProps.path) {
            this.state = {
                imgData: [],
                dragging: false,
                parentIdx: -1,
                childIdx: -1,
                loading: true
            }
            this.getShuffledImages()
        }
    }

    travelDistance = () => {
        return ({ _xtravelled: Math.abs(this._selected._x - this._current._x), _ytravelled: Math.abs(this._selected._y - this._current._y) })
    }

    traversalPoint = (point: number, previousPoint: number, rowSize: number, offset: number, currenIdx: number, size: number) => {
        if (point < (previousPoint - rowSize)) {
            return ((currenIdx == 0 ? 0 : (currenIdx - 1)) * rowSize) + offset
        }
        else if (point > (previousPoint + rowSize)) {
            return ((currenIdx == (size - 1) ? currenIdx : (currenIdx + 1)) * rowSize) + offset
        }
        else
            return point
    }

    animateX = (x: number) => {
        Animated.event([{ x: this.point.x }])({ x: x });
    }

    animateY = (y: number) => {
        Animated.event([{ y: this.point.y }])({ y: y });
    }

    animatePoint = (point: { _x: number, _y: number }) => {
        Animated.event([{ x: this.point.x, y: this.point.y }])({ x: point._x, y: point._y });
    }

    animateList = () => {
        if (!this.state.dragging) {
            return;
        }

        requestAnimationFrame(() => {
            const { _xtravelled, _ytravelled } = this.travelDistance()
            if (_xtravelled > _ytravelled) {
                if (this.state.parentIdx != -1 && this.state.childIdx != -1) {
                    const newIdx = this.draggedXToIndex(this._current._x, this.state.parentIdx, this.columns);
                    if (this.state.parentIdx !== newIdx) {
                        // swapping
                        const d = this.state.imgData[this.state.parentIdx][this.state.childIdx]
                        this.state.imgData[this.state.parentIdx][this.state.childIdx] = this.state.imgData[newIdx][this.state.childIdx]
                        this.state.imgData[newIdx][this.state.childIdx] = d
                        //reset data
                        this.setState({
                            imgData: this.state.imgData
                        }, () => { this.reset() });
                    }
                }
            }
            else if (_xtravelled < _ytravelled) {
                if (this.state.parentIdx != -1 && this.state.childIdx != -1) {
                    const newIdx = this.draggedYToIndex(this._current._y, this.state.childIdx, this.rows);
                    if (this.state.childIdx !== newIdx) {
                        // swapping
                        const d = this.state.imgData[this.state.parentIdx][this.state.childIdx]
                        this.state.imgData[this.state.parentIdx][this.state.childIdx] = this.state.imgData[this.state.parentIdx][newIdx]
                        this.state.imgData[this.state.parentIdx][newIdx] = d
                        //reset data
                        this.setState({
                            imgData: this.state.imgData,
                        }, () => { this.reset() });
                    }
                }
            }
            this.animateList();

        });
    };

    draggedYToIndex = (y: number, childIdx: number, colLength: number) => {
        const value = Math.floor(
            (y - this.flatlistTopOffset) / this.rowHeight
        );
        if ((childIdx == 0 && value < 0) || ((childIdx == colLength - 1) && value > childIdx))
            return childIdx

        if (value < childIdx - 1) {
            return childIdx - 1;
        }

        if (value > childIdx + 1) {
            return childIdx + 1;
        }

        return value;
    };

    draggedXToIndex = (x: number, parentIdx: number, rowLength: number) => {
        const value = Math.floor(
            (x - this.flatlistLeftOffset) / this.rowWidth
        );
        if ((parentIdx == 0 && value < 0) || ((parentIdx == rowLength - 1) && value > parentIdx))
            return parentIdx

        if (value <= (parentIdx - 1)) {
            return parentIdx - 1;
        }

        if (value >= (parentIdx + 1)) {
            return parentIdx + 1;
        }

        return value;
    };

    getIndex = (point: number, offset: number, rowSize: number, length: number) => {
        const value = Math.floor(
            (point - offset) / rowSize
        );

        if (value < 0) {
            return 0;
        }

        if (value > length - 1) {
            return length - 1;
        }

        return value;
    };
    reset = () => {
        this.setState({ dragging: false, childIdx: -1, parentIdx: -1 });
    };

    renderItem = (parentIndex: number, { item, index }: { item: React.JSX.Element, index: number }, noPanResponder = false) => (
        <ViewTHR
            style={{
                flexDirection: "row",
                height: this.rowHeight,
                width: this.rowWidth,
                position: 'relative',
                opacity: (parentIndex == this.state.parentIdx && this.state.childIdx === index) ? 0.5 : 1
            }}
            {...(noPanResponder ? {} : this._panResponder.panHandlers)}
        >
            <TextTHR>{item}</TextTHR>
        </ViewTHR>
    );

    render() {
        return (
            <ViewTHR full paddingTop={this.paddingTop} paddingLeft={this.paddingLeft} style={styles.container}>
                {this.state.dragging && (
                    <Animated.View
                        style={{
                            position: "absolute",
                            zIndex: 2,
                            width: this.rowWidth,
                            top: this.point.getLayout().top,
                            left: this.point.getLayout().left
                        }}
                    >
                        {this.renderItem(this.state.parentIdx, { item: this.state.imgData[this.state.parentIdx][this.state.childIdx], index: -1 }, true)}
                    </Animated.View>
                )}
                {
                    this.state.loading ?
                        <ViewTHR full justifyCenter marginBottom={50} style={styles.container}>
                            <Image
                                source={require('../assets/loading.gif')}
                                style={[
                                    {
                                        width: '100%',
                                        height: '90%',
                                        resizeMode: 'stretch',
                                        marginHorizontal: cssConstants.DEFAULT_MARGIN / 2,
                                        borderRadius: 10
                                    },
                                ]}
                            />
                        </ViewTHR>
                        :
                        <FlatList
                            data={this.state.imgData}
                            horizontal
                            scrollEnabled={false}
                            renderItem={(outerData) => <FlatList
                                scrollEnabled={false}
                                data={outerData.item}
                                style={{ width: this.rowWidth }}
                                renderItem={({ item, index }: { item: React.JSX.Element, index: number }) =>
                                    this.renderItem(outerData.index, { item, index })
                                }
                                scrollEventThrottle={16}
                                keyExtractor={(item, index) => `${outerData.index}#${index}#${item.key || ''}`}
                            />}
                            onLayout={e => {
                                this.flatlistTopOffset = e.nativeEvent.layout.y;
                                this.flatlistLeftOffset = e.nativeEvent.layout.x;
                            }}
                            scrollEventThrottle={16}
                            keyExtractor={(item, index) => '' + index}
                        />
                }

            </ViewTHR>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: cssConstants.PRIMARY_COLOR
    }
});
