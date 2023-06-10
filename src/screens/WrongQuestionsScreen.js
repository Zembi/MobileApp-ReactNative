import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Animated, ImageBackground, FlatList, Button, TouchableHighlight, Alert, InteractionManager, useFocusEffect } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";

import Question from '../../comp/Question';
import EditQuestionBtn from '../../comp/EditQuestionBtn';
import EmptyQues from '../../comp/EmptyQues';

export default class WrongQuestionsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.premiumAccount = props.premiumAccount;
        this.nav = props.navigation;
        this.questionsFromJson = props.route.params.questionsFromJson;
        // this.starredQuestionsFromJson = this.questionsFromJson.questions.filter(item => item.starred);
        this.state = {
            lastSaved: true,
            wrongQuestionsId: [],
            wrongQuestionsFromJson: [],
            emptyQs: true,
            moveAnim: new Animated.Value(1)
        }

        this.updateSaved = this.updateSaved.bind(this);
        this.updateStoreQues = this.updateStoreQues.bind(this);
        this.informChildBtnIfQueEmpty = this.informChildBtnIfQueEmpty.bind(this);
        this.actionToHeader = this.actionToHeader.bind(this);


        this.tableOfData = 'questions';
        // DATABASE ACTIONS
        this.DB = SQLite.openDatabase('quesyooy.db');

        this.createTable = this.createTable.bind(this);
        this.getSavedTable = this.getSavedTable.bind(this);
        this.insertIntoTable = this.insertIntoTable.bind(this);
        this.deleteFromTable = this.deleteFromTable.bind(this);
    }

    updateSaved() {
        this.setState({
            lastSaved: !this.state.lastSaved,
        })
    }

    updateStoreQues(newStoredQs) {
        this.setState({
            wrongQuestionsId: newStoredQs.map(dbData => dbData.id),
            emptyQs: newStoredQs.length === 0 ? true : false,
            wrongQuestionsFromJson: this.questionsFromJson.questions.filter((question) =>
                newStoredQs.map(dbData => dbData.id).includes(question.id) ? question : null
            ),
        });
    }

    unsavedChanges() {
        if (Platform.OS === 'ios') {
            this.forIOSMount();
        }
        else {
            this.forAndroidMount();
        }
    }

    forIOSMount() {
        this.nav.setOptions({
            headerLeft: () => (
                <Button
                    onPress={() => { this.state.lastSaved ? this.nav.goBack : askBeforeLeaving() }}
                    title={this.previousScreenGr}
                    color="rgb(148, 10, 10)"
                />
            ),
        });

        const navig = this.nav;
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
        const checkSaved = this.state.lastSaved;
        this.nav.addListener('beforeRemove', (e) => {
            if (checkSaved) {
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

    // DATABASES -----
    createTable() {
        this.DB.transaction(
            (tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS ' + this.tableOfData + ' (id INTEGER PRIMARY KEY, SavedQ BOOLEAN, WrongQ BOOLEAN)',
                    [],
                    (t, r) => {
                        console.log('Table all right.');
                    },
                    (_, error) => {
                        console.log('Err_Create ' + error);
                    }
                );
            }
        );
    }

    getSavedTable() {
        this.DB.transaction(
            (tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.tableOfData} WHERE WrongQ = TRUE`,
                    [],
                    (tx, results) => {
                        // console.log('Got all saved questions.');
                        this.updateStoreQues(results.rows._array);

                        // UPDATE NAVIGATION RIGHT BUTTON
                        this.nav.setOptions({
                            action: { funct: this.actionToHeader, type: 'DELETE' },
                        });
                    },
                    (_, error) => {
                        console.log('Err_Get ' + error);
                    }
                );
            }
        );
    }

    insertIntoTable(id, status) {
        this.DB.transaction(
            (tx) => {
                tx.executeSql(
                    `INSERT INTO ${this.tableOfData} (Id, WrongQ) 
                     SELECT ?,? 
                     WHERE NOT EXISTS(SELECT 1 FROM ${this.tableOfData} WHERE id = ${id})`,
                    [id, status],
                    (tx, results) => {
                        // console.log('INSERTED - LINE WITH ID: ' + id);
                        console.log(results);
                        if (results.rowsAffected === 0) {
                            this.updateFromTable(id, true);
                        }
                    },
                    (_, error) => {
                        console.log('Err_Insert ' + error);
                    }
                );
            }
        )
    }

    updateFromTable(id, value) {
        this.DB.transaction(
            (tx) => {
                tx.executeSql(
                    `UPDATE ${this.tableOfData}
                     SET WrongQ = ?
                     WHERE Id = ?`,
                    [value, id],
                    (tx, results) => {
                        // console.log(this.tableOfData + 'DELETED - LINE WITH ID: ' + id);
                    },
                    (_, error) => {
                        console.log('Err_Update ' + error);
                    }
                );
            }
        )
    }

    deleteFromTable(id) {
        this.DB.transaction(
            (tx) => {
                tx.executeSql(
                    'DELETE FROM ' + this.tableOfData + ' WHERE Id = ?',
                    [id],
                    (tx, results) => {
                        // console.log(this.tableOfData + 'DELETED - LINE WITH ID: ' + id);
                    },
                    (_, error) => {
                        console.log('Err_Delete ' + error);
                    }
                );
            }
        )
    }

    componentDidMount() {
        Animated.timing(this.state.moveAnim, { toValue: 0, delay: 0, duration: 500, useNativeDriver: true }).start();

        // DATABASE ACTIONS
        this.createTable();
        // this.deleteFromTable(1);
        // this.deleteFromTable(2);
        // this.deleteFromTable(3);
        // this.updateFromTable(1, true);
        // this.updateFromTable(3, true);
        // this.updateFromTable(4, true);
        // this.insertIntoTable(1, true);
        // this.insertIntoTable(3, true);
        // this.insertIntoTable(4, true);
        // this.insertIntoTable(10, false);
        this.getSavedTable();
    }

    informChildBtnIfQueEmpty(idToDelete) {
        this.updateFromTable(idToDelete, false);
        this.getSavedTable();
        this.setState({
            wrongQuestionsFromJson: this.state.wrongQuestionsFromJson.filter(question => question.id !== idToDelete),
        })
    }

    actionToHeader() {
        this.state.wrongQuestionsFromJson.map(question => {
            this.updateFromTable(question.id, false);
        });
        this.getSavedTable();
        this.setState({
            wrongQuestionsFromJson: [],
        });
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
                    <Text style={styles.movedInSumOfQuesText}>Σύνολο λανθασμένων ερωτήσεων: {this.state.wrongQuestionsFromJson.length}</Text>
                </Animated.View>
                <View style={styles.listOfQuestionsWrapper}>
                    {this.state.emptyQs ?
                        <EmptyQues />
                        :
                        <FlatList
                            data={this.state.wrongQuestionsFromJson}
                            renderItem={({ item, index }) => {
                                return (
                                    <EditQuestionBtn navigation={this.nav} temporaryID={index + 1} question={new Question(item.id, item.img, item.question, item.answers, item.rightAnswerIndex, item.starred, item.premium)}
                                        queEmptyOrNot={this.informChildBtnIfQueEmpty} />
                                );
                            }}
                            keyExtractor={item => item.id + 'storedQFlatList'}
                            style={styles.listOfQuestions} />
                    }
                </View>

                {/* FOOTER */}
                < View style={basicStyles.footer} ></View>
            </SafeAreaView>
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