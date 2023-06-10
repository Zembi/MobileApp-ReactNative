import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Animated, ImageBackground, FlatList, Button, TouchableHighlight, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

import Question from '../../comp/Question';
import EachTestQuestionsScreen from './EachTestQuestionsScreen';


export default class TestQuestionsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.nav = props.navigation;
        this.testObj = props.route.params.testObj;
        this.testQuestObj = this.testObj.map(test => {
            return new Question(test.id, test.img, test.question, test.answers, test.rightAnswerIndex, test.starred, test.premium);
        })
        this.state = {
        }

        this.actionToHeader = this.actionToHeader.bind(this);
    }

    componentDidMount() {
        // UPDATE NAVIGATION RIGHT BUTTON
        this.nav.setOptions({
            action: { funct: this.actionToHeader, type: 'INFO' },
        });
    }

    actionToHeader() {
        console.log("TEST");
    }

    render() {
        return (
            <SafeAreaView style={[styles.container]} >

                <View style={styles.listOfQuestionsWrapper}>
                    <EachTestQuestionsScreen />
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
        aligntests: 'center',
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
        aligntests: 'center',
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
        aligntests: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(217, 217, 217, 0.9)',
        borderTopWidth: 1, borderTopColor: 'grey',
        marginTop: 10,
    },
});