import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, RefreshControl, ScrollView, ImageBackground, FlatList, Button, TouchableHighlight, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import Question from '../../comp/Question';
import QuestionBtn from '../../comp/QuestionBtn';

export default class SosQuestionsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.nav = props.navigation;
        this.previousScreen = props.route.params.beforeScreen;
        this.previousScreenGr = props.route.params.beforeScreenGr;
        this.state = {
            lastSaved: false
        }

        this.previewSavedQuestions = this.previewSavedQuestions.bind(this);
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            this.forIOSMount();
        }
        else {
            this.forAndroidMount();
        }

        this.previewSavedQuestions();
    }

    forIOSMount() {

        this.nav.setOptions({
            headerLeft: () => (
                <Button
                    onPress={() => {
                        askBeforeLeaving();
                    }}
                    title={this.previousScreenGr}
                    color="red"
                />
            ),
        });

        const navig = this.nav;
        const target = this.previousScreen;
        function askBeforeLeaving() {
            Alert.alert(
                'Βρέθηκαν μη αποθηκευμένες αλλαγές!', 'Είσαι σίγουρος πως θες να τις διαγράψεις και να συνεχίσεις;',
                [
                    { text: "ΟΧΙ", style: 'cancel', onPress: () => { } },
                    {
                        text: 'ΝΑΙ',
                        style: 'default',
                        // If the user confirmed, then we dispatch the action we blocked earlier
                        // This will continue the action that had triggered the removal of the screen
                        onPress: () => navig.pop()
                    },
                ],
            );
        }
    }

    forAndroidMount() {
        this.nav.addListener('beforeRemove', (e) => {
            if (!true) {
                // If we don't have unsaved changes, then we don't need to do anything
                return;
            }

            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Prompt the user before leaving the screen
            Alert.alert(
                'Βρέθηκαν μη αποθηκευμένες αλλαγές!', 'Είσαι σίγουρος πως θες να τις διαγράψεις και να συνεχίσεις;',
                [
                    { text: "ΟΧΙ", style: 'cancel', onPress: () => { } },
                    {
                        text: 'ΝΑΙ',
                        style: 'default',
                        // If the user confirmed, then we dispatch the action we blocked earlier
                        // This will continue the action that had triggered the removal of the screen
                        onPress: () => this.nav.dispatch(e.data.action),
                    },
                ],
            );
        });
    }

    previewSavedQuestions() {

    }

    render() {

        const DATA = [
            {
                temporaryID: 1,
                iD: 1,
                img: 21,
                que: 'fgehfgehfghfgehfgehfghfgehfgehfghfgehfgehfgh',
                answerAr: [21312, 123123, 123123],
                rightAnsIndex: 2
            },
            {
                temporaryID: 2,
                iD: 2,
                img: 21,
                que: 'fkfhehfeyfeg',
                answerAr: ['fl;df', 'fe;f;k,', 'flekfjekjfk'],
                rightAnsIndex: 2
            }
        ]

        return (
            <SafeAreaView style={[styles.container]} >
                {/* HEADER */}
                <View style={basicStyles.header}>
                    <Text style={basicStyles.topBar}>{this.titleOfApp}</Text>
                </View>

                {/* BODDY */}
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <QuestionBtn navigation={this.nav} temporaryID={item.temporaryID} question={new Question(item.iD, item.img, item.que, item.answerAr, item.rightAnsIndex)} />}
                    keyExtractor={item => item.iD}
                    style={styles.listOfQuestions} />

                {/* FOOTER */}
                <View style={basicStyles.footer}></View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    listOfQuestions: {
        flex: 1,
        backgroundColor: 'transparent'
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
        borderTopWidth: 1, borderTopColor: 'grey'
    },
});