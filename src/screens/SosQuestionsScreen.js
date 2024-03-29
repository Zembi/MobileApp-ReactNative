import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Animated, ImageBackground, FlatList, Button, TouchableHighlight, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

import Question from '../../comp/Question';
import SosQuestionBtn from '../../comp/SosQuestionBtn';
import EmptyQues from '../../comp/EmptyQues';

export default class SosQuestionsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.premiumAccount = props.premiumAccount;
        this.nav = props.navigation;
        this.questionsFromJson = props.route.params.questionsFromJson;
        this.starredQuestionsFromJson = this.questionsFromJson.questions.filter(item => item.starred);
        this.state = {
            moveAnim: new Animated.Value(1),
            emptyQs: false,
        }

        this.updateEmptyQs = this.updateEmptyQs.bind(this);
        this.actionToHeader = this.actionToHeader.bind(this);
    }

    updateEmptyQs(arg) {
        this.setState({
            emptyQs: arg,
        });
    }

    componentDidMount() {
        if (this.starredQuestionsFromJson.length === 0) {
            this.updateEmptyQs(true);
        }

        Animated.timing(this.state.moveAnim, { toValue: 0, delay: 0, duration: 500, useNativeDriver: true }).start();

        // UPDATE NAVIGATION RIGHT BUTTON
        this.nav.setOptions({
            action: { funct: this.actionToHeader, type: 'INFO' },
        });
    }

    actionToHeader() {
        console.log("UIOSODIOS");
    }

    render() {
        let c = 0;
        const finalVal = this.state.moveAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -100],
        });

        return (
            <SafeAreaView style={[styles.container]} >

                {/* BODDY */}
                <Animated.View style={[
                    styles.movedInSumOfQues,
                    { transform: [{ translateY: finalVal }] }
                ]}>
                    <Text style={styles.movedInSumOfQuesText}>Σύνολο σημαντικών ερωτήσεων: {this.starredQuestionsFromJson.length}</Text>
                </Animated.View>
                <View style={styles.listOfQuestionsWrapper}>
                    {this.state.emptyQs ?
                        <EmptyQues />
                        :
                        <FlatList
                            data={this.starredQuestionsFromJson}
                            renderItem={({ item }) => {
                                c++;
                                return (<SosQuestionBtn navigation={this.nav} temporaryID={c} question={new Question(item.id, item.img, item.question, item.answers, item.rightAnswerIndex, item.starred, item.premium)} />);
                            }}
                            keyExtractor={item => item.id + 'sosQFlatList'}
                            style={styles.listOfQuestions} />
                    }
                </View>

                {/* FOOTER */}
                < View style={basicStyles.footer} ></View>
            </SafeAreaView >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(163, 163, 163)',
    },
    movedInSumOfQues: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'rgb(41, 134, 227)',
        borderBottomRightRadius: 0, borderBottomLeftRadius: 0,
        zIndex: 1000
        // marginBottom: 10,
    },
    movedInSumOfQuesText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        paddingVertical: 2, paddingBottom: 4
    },
    listOfQuestionsWrapper: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        borderRadius: 5,
        borderTopWidth: 2, borderTopColor: 'rgb(165, 202, 230)',
    },
    listOfQuestionsEmptyWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    listOfQuestionsEmpty: {
        fontSize: 20,
    },
    listOfQuestions: {
        flex: 1,
        backgroundColor: 'transparent',
    }
});

const basicStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(217, 217, 217, 0.9)',
        borderBottomWidth: 1, borderBottomColor: 'grey',
        paddingTop: 10, paddingBottom: 5
    },
    topBar: {
        fontSize: 26
    },
    footer: {
        flex: 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(217, 217, 217, 0.9)',
        borderTopWidth: 1, borderTopColor: 'grey',
        marginTop: 10,
    },
});