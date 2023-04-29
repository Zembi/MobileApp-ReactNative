import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, RefreshControl, ScrollView, ImageBackground, FlatList, Button, TouchableHighlight, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import Question from '../../comp/Question';
import QuestionBtn from '../../comp/QuestionBtn';

export default class SosQuestionsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.nav = props.navigation;
        this.state = {
        }
    }

    componentDidMount() {
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

    render() {
        return (
            <SafeAreaView style={[styles.container]} >
                {/* HEADER */}
                <View style={basicStyles.header}>
                    <Text style={basicStyles.topBar}>{this.titleOfApp}</Text>
                </View>

                {/* BODDY */}
                <View style={styles.listOfQuestions}>
                    <QuestionBtn question={new Question(1, 12, 12, 12, 12)}></QuestionBtn>
                    <QuestionBtn question={new Question(2, 12, 12, 12, 12)}></QuestionBtn>
                </View>

                {/* FOOTER */}
                <View style={basicStyles.footer}></View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    },
    listOfQuestions: {
        flexDirection: 'column'
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