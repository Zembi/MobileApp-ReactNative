import React from 'react';
import { StyleSheet, Text, View, Image, Animated, Alert, Pressable } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";

import chooseImg from './chooseImg'
import { RightAnswer, WrongAnswer } from './Answers';

export default class EditQuestionBtn extends React.Component {
    constructor(props) {
        super(props);
        this.nav = props.navigation;
        this.questionObj = props.question;
        this.queEmptyOrNot = props.queEmptyOrNot;
        this.state = {
            isFocus: false,
            isOpened: false,
            openAnim: new Animated.Value(.3),
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
        Animated.timing(this.state.openAnim, { toValue: 1, delay: 0, duration: 300, useNativeDriver: true }).start(({ finished }) => {
            this.setState({
                openAnim: new Animated.Value(.3)
            });
        });

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
                    onPress: () => { this.deleteThisItem(); }
                },
            ],
        );
    }

    deleteThisItem() {
        this.queEmptyOrNot(this.questionObj.iD);
    }

    componentDidMount() {
    }

    render() {
        const imgPath = chooseImg(this.questionObj.img);
        let idC = -1;

        const answersRender = this.questionObj.answersAr.map(item => {
            idC++;
            if ((idC + 1) === this.questionObj.rightAnswIndex) {
                return (<RightAnswer key={this.questionObj.iD + idC + 'sosQuesAnswersText'} answer={item} answerCount={idC + 1} />);
            }
            else {
                return (<WrongAnswer key={this.questionObj.iD + idC + 'sosQuesAnswersText'} answer={item} answerCount={idC + 1} />);
            }
        }
        );

        const finalVal = this.state.openAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-250, 0],
        });

        return (
            <View style={
                [
                    questionBtnStyles.btnContainer,
                    this.state.isOpened ? { borderTopColor: 'rgb(165, 202, 230)', borderBottomColor: 'transparent' } : { borderTopColor: 'rgb(45, 71, 89)', borderBottomColor: 'rgb(45, 71, 89)' },
                ]} >
                <Pressable
                    style={questionBtnStyles.btn}
                    onPress={this._onPress}
                    onLongPress={this._onLongPress}
                    delayLongPress={500}
                    onPressIn={this._onFocus}
                    onPressOut={this._onBlur}
                    key={this.questionObj.iD + 'sosQuestions'}>
                    <View style={[questionBtnStyles.btnUpSide, { backgroundColor: this.state.isFocus ? 'rgb(100, 100, 100)' : 'rgb(50, 50, 50)' }]}>
                        <View style={questionBtnStyles.btnUpSideInside}>
                            <Image style={questionBtnStyles.btnImg} resizeMode='cover' source={imgPath}></Image>
                            <Text numberOfLines={1} style={questionBtnStyles.btnText}> {this.props.temporaryID}) {this.questionObj.question} (#ID:{this.questionObj.iD})</Text>
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
                </Pressable >
                {
                    this.state.isOpened ?
                        <Animated.View style={[
                            questionBtnStyles.btnDownSide,
                            { translateY: finalVal },
                            this.state.isOpened ? { height: 'auto' } : { height: 0 }
                        ]}>
                            <Image style={questionBtnStyles.btnDownSidebtnImg} resizeMode='cover' source={imgPath} />
                            <View style={questionBtnStyles.btnDownSideWholeParText}>
                                <Text style={questionBtnStyles.btnDownSidebtnQuestionText}>{this.questionObj.question}</Text>
                                <View style={questionBtnStyles.btnDownSidebtnAnswers}>
                                    {answersRender}
                                </View>
                            </View>
                        </Animated.View> :
                        null
                }
            </View >
        );
    }
}

const questionBtnStyles = StyleSheet.create({
    btnContainer: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden',
        borderTopWidth: 1, borderBottomWidth: 2,
        marginHorizontal: 0
    },
    btn: {
        flex: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        overflow: 'hidden',
        zIndex: 100,
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
        backgroundColor: 'rgb(59, 80, 94)',
        zIndex: 1
    },
    btnDownSidebtnImg: {
        width: 100, height: 100,
        marginTop: 10, marginBottom: 5,
    },
    btnDownSideWholeParText: {
        width: '90%',
        marginBottom: 10,
    },
    btnDownSidebtnQuestionText: {
        flex: 1,
        color: 'white',
        fontSize: 19,
        textAlign: 'center',
    },
    btnDownSidebtnAnswers: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    }
});