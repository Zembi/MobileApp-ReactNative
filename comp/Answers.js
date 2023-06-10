
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, RefreshControl, ScrollView, ImageBackground, FlatList, Button, TouchableHighlight, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export class RightAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.answerCount = props.answerCount;
        this.answerString = props.answer;
    }

    render() {
        return (
            <View style={styles.rightAnswer}>
                <Text style={styles.rightAnswerText}>{this.answerCount}. {this.answerString}</Text>
            </View>
        );
    }
}

export class WrongAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.answerCount = props.answerCount;
        this.answerString = props.answer;
    }

    render() {
        return (
            <View style={styles.wrongAnswer}>
                <Text style={styles.wrongAnswerText}>{this.answerCount}. {this.answerString}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rightAnswer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 5,
        marginVertical: 2,
    },
    rightAnswerText: {
        flex: 1,
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    wrongAnswer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 5,
        marginVertical: 2,

    },
    wrongAnswerText: {
        flex: 1,
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});