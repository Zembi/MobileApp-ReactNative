import React from 'react';
import { StyleSheet, View, Text, StatusBar, Button, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SosQuestionsScreen from './src/screens/SosQuestionsScreen';

import * as SQLite from "expo-sqlite";

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }

    const db = SQLite.openDatabase('Questions'
        // ,
        //         location: 'default',
        //     },
        //     () => { console.log('DATABASE OPENED') },
        //     error => {
        //         console.log('DATABASE ERROR')
        //     }
    );
    return db;
}

const db = openDatabase();

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenNow: 'home'
        }

        this.changeScreen = this.changeScreen.bind(this);
        this.createTable = this.createTable.bind(this);
    }

    changeScreen(moveTo) {
        this.setState({
            screenNow: moveTo
        });
    }

    createTable() {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS'
                + 'Questions'
                + '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Img TEXT, Question TEXT, AllAnswers TEXT, RightAnswerIndex INTEGER)',
                [],
                () => {
                    alert('allGood');
                },
                (error) => { console.log('error') }
            );
        })

        db.transaction(
            (tx) => {
                // tx.executeSql("insert into Questions (id) values (0)", []);
                tx.executeSql("select * from Questions", [],
                    (tx, results) => { alert(1) },
                    error => { console.log('Ererlererorr') }
                );
            }
        );
        // console.log(db);
    }

    componentDidMount() {
        this.createTable();
    }

    render() {
        let homeOptions = null;
        let screenOptions = null;

        if (Platform.OS === "ios") {
            // FOR IOS
            homeOptions = {
                headerShown: true,
                gestureEnabled: true
            }

            screenOptions = {
                headerShown: true,
                gestureEnabled: false,
            }
        }
        else {
            // FOR ANDROID AND WEB
            homeOptions = {
                headerShown: true,
                gestureEnabled: true
            }

            screenOptions = {
                headerShown: true,
                gestureEnabled: true
            }
        }



        return (
            <SafeAreaProvider>
                <StatusBar
                    animated={true}
                    backgroundColor="rgb(217, 217, 217)"
                    barStyle='dark-content'
                />

                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={homeOptions}
                        />
                        <Stack.Screen
                            name="SosQuestions"
                            component={SosQuestionsScreen}
                            options={screenOptions}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider >
        );
    }
}

const styles = StyleSheet.create({

});