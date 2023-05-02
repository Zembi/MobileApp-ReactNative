import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Animated, Alert } from 'react-native';
// import Animated, { withTiming, useSharedValue } from 'react-native-reanimated'
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


export default class QuestionBtn extends React.Component {
    constructor(props) {
        super(props);
        this.nav = props.navigation;
        this.temporaryID = props.temporaryID;
        this.questionObj = props.question;

        this.state = {
            isFocus: false,
            isOpened: false,
            openAnim: new Animated.Value(-100),

            isDeleted: false,
        };

        // SET MAIN VALUES
        this.imgColor = 'rgba(77, 184, 255, 0.4)';
        this.imgAfterColor = 'white';
        this.imgSize = 45;

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);

        this.updateQuestionViewStatus = this.updateQuestionViewStatus.bind(this);
        this._onPress = this._onPress.bind(this);
        this._onLongPress = this._onLongPress.bind(this);
        this.deleteThisItem = this.deleteThisItem.bind(this);
    }

    _onFocus() {
        if (!this.state.isFocus) {
            this.setState({
                isFocus: true,
            });
        }
    }

    _onBlur() {
        if (this.state.isFocus) {
            this.setState({
                isFocus: false,
            });
        }
    }

    updateQuestionViewStatus() {
        this.setState({
            isOpened: !this.state.isOpened,
        });
    }

    _onPress() {
        Animated.timing(this.state.openAnim, { toValue: this.state.isOpened ? -100 : 0, delay: 0, duration: 300, useNativeDriver: true }).start();

        this.updateQuestionViewStatus();
    }

    _onLongPress() {
        Alert.alert(
            'ΠΡΟΣΟΧΗ!', 'Είσαι σίγουρος πως θες να διαγράψεις αυτή την ερώτηση;',
            [
                { text: "ΟΧΙ", style: 'cancel', onPress: () => { } },
                {
                    text: 'ΝΑΙ',
                    style: 'default',
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: () => { this.deleteThisItem() }
                },
            ],
        );
    }

    deleteThisItem() {
        this.setState({
            isDeleted: true,
        })
    }

    render() {
        if (this.state.isDeleted) {
            return '';
        }
        else {
            return (
                <TouchableHighlight
                    style={questionBtnStyles.btn}
                    onPress={this._onPress}
                    onLongPress={this._onLongPress}
                    delayLongPress={700}
                    onShowUnderlay={this._onFocus}
                    onHideUnderlay={this._onBlur}
                    underlayColor={'rgba(0, 0, 0, 0)'}
                    key={this.questionObj.iD}>
                    <View style={questionBtnStyles.btnContainer}>
                        <View style={[questionBtnStyles.btnUpSide, { backgroundColor: this.state.isFocus ? 'rgb(100, 100, 100)' : 'rgb(50, 50, 50)' }]}>
                            <View style={questionBtnStyles.btnUpSideInside}>
                                <Image style={questionBtnStyles.btnImg} resizeMode='cover' source={require('../assets/PlaceImageHere.jpg')} />
                                <Text numberOfLines={1} style={questionBtnStyles.btnText}>{this.temporaryID}) {this.questionObj.question}</Text>
                            </View>
                            <View style={questionBtnStyles.btnOpenCloseIndicator}>
                                <AntDesign
                                    style={questionBtnStyles.btnOpenCloseIndicatorImg}
                                    color={this.state.isFocus ? 'grey' : 'white'}
                                    name={this.state.isOpened ? 'caretup' : 'caretdown'}
                                    size={12}
                                />
                            </View>
                        </View>
                        <Animated.View style={[questionBtnStyles.btnDownSide, { translateY: this.state.openAnim },
                        this.state.isOpened ? { height: 'auto' } : { height: 0 }]}>
                            <Image style={questionBtnStyles.btnDownSidebtnImg} resizeMode='cover' source={require('../assets/PlaceImageHere.jpg')} />
                            <View style={questionBtnStyles.btnDownSideWholeParText}>
                                <Text style={questionBtnStyles.btnDownSidebtnText}>{this.temporaryID}) {this.questionObj.question}</Text>
                            </View>
                        </Animated.View>
                    </View>
                </TouchableHighlight >
            );
        }
    }
}

const questionBtnStyles = StyleSheet.create({
    btn: {
        flex: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        overflow: 'hidden',
        marginBottom: 2, marginHorizontal: 0
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 0
    },

    btnUpSide: {
        flex: 1,
        backgroundColor: 'green',
        elevation: 10,
        paddingHorizontal: 5,
        zIndex: 100
    },
    btnUpSideInside: {
        flexDirection: 'row',
    },
    btnImg: {
        flex: 0,
        width: 60, height: 60,
        marginRight: 10, marginVertical: 10
    },
    btnText: {
        flex: 1,
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        textAlign: 'left',
        paddingHorizontal: 2
    },

    btnOpenCloseIndicator: {
        flex: 1,
        flexDirection: 'column',
    },
    btnOpenCloseIndicatorImg: {
        flex: 1,
        alignSelf: 'center',
        paddingBottom: 2
    },

    btnDownSide: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 61, 102, 0.5)',
        zIndex: 1
    },
    btnDownSidebtnImg: {
        width: 100, height: 100,
        marginVertical: 10
    },
    btnDownSideWholeParText: {
        marginVertical: 10
    },
    btnDownSidebtnText: {
    }
});