import React from 'react';
import { StyleSheet, View, Text, StatusBar, Button, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import TestQuestionsScreen from './src/screens/TestQuestionsScreen';
import SosQuestionsScreen from './src/screens/SosQuestionsScreen';
import StoredQuestionsScreen from './src/screens/StoredQuestionsScreen';
import WrongQuestionsScreen from './src/screens/WrongQuestionsScreen';

import { HeaderTitle, HeaderLeftBtn, HeaderRightBtn } from './comp/Header';
import { getHeaderTitle } from "@react-navigation/elements";


const Stack = createNativeStackNavigator();

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let homeOptions = null;
        let screenOptions = null;

        if (Platform.OS === "ios") {
            // ------ FOR IOS ------

            // HOME SCREEN
            homeOptions = {
                headerShown: true,
                gestureEnabled: true,
            }

            // SOSQS SCREEN
            screenOptions = {
                headerShown: true,
                gestureEnabled: true,
            }
        }
        else {
            // ------ FOR ANDROID AND WEB ------

            // HOME SCREEN
            homeOptions = {
                headerShown: true,
                gestureEnabled: true,
            }

            // SOSQS SCREEN
            screenOptions = {
                headerShown: true,
                gestureEnabled: true
            }
        }

        return (
            <SafeAreaProvider style={styles.rootOfWholeApp}>
                <StatusBar
                    animated={true}
                    backgroundColor="rgb(217, 217, 217)"
                    barStyle='dark-content'
                />

                <NavigationContainer>
                    <Stack.Navigator>
                        {/* HOME SCREEN */}
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                header: ({ navigation, route, options, back }) => {
                                    const title = getHeaderTitle(options, route.name);

                                    return (
                                        <HeaderTitle
                                            title={'Αρχική'}
                                            leftButton={
                                                back ?
                                                    <HeaderLeftBtn nav={navigation} /> :
                                                    ''
                                            }
                                            rightButton={
                                                back ?
                                                    <HeaderRightBtn /> :
                                                    ''
                                            }
                                        />
                                    );
                                }
                            }}
                        >
                        </Stack.Screen>
                        {/* TEST QUESTIONS SCREEN */}
                        <Stack.Screen
                            name="TestQuestions"
                            component={TestQuestionsScreen}
                            options={{
                                header: ({ navigation, route, options, back }) => {
                                    const title = getHeaderTitle(options, route.name);
                                    const action = options.action ?? null;

                                    if (action !== null) {
                                        return (
                                            <HeaderTitle
                                                title={'Εξέταση'}
                                                leftButton={
                                                    back ?
                                                        <HeaderLeftBtn nav={navigation} /> :
                                                        ''
                                                }
                                                rightButton={
                                                    <HeaderRightBtn action={action} />
                                                }
                                            />
                                        );
                                    }
                                }
                            }}
                        />
                        {/* SOS QUESTIONS SCREEN */}
                        <Stack.Screen
                            name="SosQuestions"
                            component={SosQuestionsScreen}
                            options={{
                                header: ({ navigation, route, options, back }) => {
                                    const title = getHeaderTitle(options, route.name);
                                    const action = options.action ?? null;

                                    if (action !== null) {
                                        return (
                                            <HeaderTitle
                                                title={'Εμβύθιση γνώσεων'}
                                                leftButton={
                                                    back ?
                                                        <HeaderLeftBtn nav={navigation} /> :
                                                        ''
                                                }
                                                rightButton={
                                                    <HeaderRightBtn action={action} />
                                                }
                                            />
                                        );
                                    }
                                }
                            }}
                        />
                        {/* STORED QUESTIONS SCREEN */}
                        <Stack.Screen
                            name="StoredQuestions"
                            component={StoredQuestionsScreen}
                            options={{
                                header: ({ navigation, route, options, back }) => {
                                    const title = getHeaderTitle(options, route.name);
                                    const action = options.action ?? null;

                                    if (action !== null) {
                                        return (
                                            < HeaderTitle
                                                title={'Αρχείο'}
                                                leftButton={
                                                    back ?
                                                        <HeaderLeftBtn nav={navigation} /> :
                                                        ''
                                                }
                                                rightButton={
                                                    <HeaderRightBtn action={action} />
                                                }
                                            />
                                        );
                                    }
                                }
                            }}
                        />
                        {/* WRONG QUESTIONS SCREEN */}
                        <Stack.Screen
                            name="WrongQuestions"
                            component={WrongQuestionsScreen}
                            options={{
                                header: ({ navigation, route, options, back }) => {
                                    const title = getHeaderTitle(options, route.name);
                                    const action = options.action ?? null;

                                    if (action !== null) {
                                        return (
                                            <HeaderTitle
                                                title={'Λάθοι'}
                                                leftButton={
                                                    back ?
                                                        <HeaderLeftBtn nav={navigation} /> :
                                                        ''
                                                }
                                                rightButton={
                                                    <HeaderRightBtn action={action} />
                                                }
                                            />
                                        );
                                    }
                                }
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider >
        );
    }
}

const styles = StyleSheet.create({
    rootOfWholeApp: {
        backgroundColor: 'rgb(163, 163, 163)',
    }
});