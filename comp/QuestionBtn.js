import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


export default class QuestionBtn extends React.Component {
    constructor(props) {
        super(props);
        this.questionObj = props.question;

        this.state = {
            isFocus: false
        };

        // SET MAIN VALUES
        this.imgColor = 'rgba(77, 184, 255, 0.4)';
        this.imgAfterColor = 'white';
        this.imgSize = 45;

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onPress = this._onPress.bind(this);
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

    _onPress() {
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this._onPress}
                onShowUnderlay={this._onFocus}
                onHideUnderlay={this._onBlur}
                style={[styles.btn, { backgroundColor: 'rgba(0, 61, 102, 0.5)' }]} >
                <View style={styles.btnContainer}>
                    <View>
                        <Image></Image>
                        <Text style={styles.btnText}>'felfelkfl'</Text>
                    </View>
                    <View></View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        borderRadius: 1,
        marginBottom: 5, marginHorizontal: 0,
        elevation: 1
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey',
        padding: 5,
    },
    btnUpSide: {

    },
    btnImg: {
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
});