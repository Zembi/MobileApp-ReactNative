import React from 'react';
import { StyleSheet, Text, View, Pressable, Platform, Animated, ImageBackground, FlatList, Button, TouchableHighlight, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

export default class EachTestQuestionsScreen extends React.Component {
    _onPress() {

    }

    _onFocus() {

    }

    _onBlur() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upScreen}></View>
                <View style={styles.downScreen}>
                    <Pressable
                        onPress={this._onPress}
                        onPressIn={this._onFocus}
                        onPressOut={this._onBlur}
                        style={styles.previousBtn}>
                        <Text>lflelfe</Text>
                    </Pressable>
                    <Pressable
                        onPress={this._onPress}
                        onPressIn={this._onFocus}
                        onPressOut={this._onBlur}
                        style={styles.nextBtn}>
                        <Text>lflelfe</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'green',
        margin: 20
    },
    upScreen: {
        flex: 5,
        backgroundColor: 'red'
    },
    downScreen: {
        flex: 1,
        flexDirection: 'row',

        backgroundColor: 'yellow'
    },
    previousBtn: {
        flex: 1,
        backgroundColor: 'blue'
    },
    nextBtn: {
        flex: 1,
        backgroundColor: 'yellow'
    }
});