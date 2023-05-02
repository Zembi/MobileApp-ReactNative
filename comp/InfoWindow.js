import React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


export default class InfoWindow extends React.Component {
    constructor(props) {
        super(props);
        this.msg = props.msg;
        this.anim = props.animation;
        this.state = {
            isOpen: props.status,
            isFocus: false,
            fadeAnim: new Animated.Value(0),
        };

        // SET MAIN VALUES
        this.imgColor = 'rgba(77, 184, 255, 0.4)';
        this.imgAfterColor = 'white';
        this.imgSize = 45;

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onPress = this._onPress.bind(this);

        this.updateIsOpen = this.updateIsOpen.bind(this);
        this._openWindow = this._openWindow.bind(this);
        this._closeWindow = this._closeWindow.bind(this);
    }

    componentDidMount() {
        Animated.timing(this.state.fadeAnim, { toValue: 1, delay: this.anim.delay, duration: this.anim.duration, useNativeDriver: true }).start();
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

    updateIsOpen() {
        if (this.state.isOpen) {
            this.setState({
                isOpen: false
            }, this._closeWindow);
        }
        else {
            this.setState({
                isOpen: true
            }, this._openWindow);
        }
    }

    _onPress() {
        this.updateIsOpen();

    }

    _openWindow() {
        console.log('open');
    }

    _closeWindow() {
        console.log('close');
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this._onPress}
                onShowUnderlay={this._onFocus}
                onHideUnderlay={this._onBlur}
                underlayColor={this.state.isOpen ? 'rgba(0, 0, 0, 0.2)' : ''}
                style={[styles.btn,
                this.state.isOpen ? { width: '95%', backgroundColor: 'rgba(255, 255, 255, 0.5)' } : { width: 'auto', backgroundColor: 'rgba(255, 255, 255, 0)' }]} >
                <Animated.View style={[styles.infoSomeWordsAbout,
                { opacity: this.state.fadeAnim }]}>
                    <Ionicons
                        style={[styles.textAboutIcon, ,
                        this.state.isOpen ? { marginRight: 10 } : { marginRight: 0 }]}
                        color={this.state.isFocus ? 'rgb(0, 46, 77)' : 'white'}
                        name={this.state.isOpen ? "ios-information-circle-outline" : "ios-information-circle"}
                        size={this.state.isOpen ? 30 : 35}
                    />
                    <Text
                        style={[styles.textAbout,
                        this.state.isFocus ? { color: 'white' } : { color: 'black' },
                        this.state.isOpen ? { display: 'flex' } : { display: 'none' }]}>
                        {this.msg}
                    </Text>
                </Animated.View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        flex: 0,
        width: '95%',
        flexDirection: 'column',
        alignItems: 'space-around',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        overflow: 'visible',
        padding: 5,
    },
    infoSomeWordsAbout: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textAboutIcon: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textAbout: {
        flex: 1,
    },
});