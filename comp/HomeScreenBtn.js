import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


export default class HomeScreenBtn extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.item.id;
        this.name = props.item.name;
        this.title = props.item.title;
        this.type = props.item.type;
        this.imgName = props.item.iconName;
        this.nav = props.nav;
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

        this.antDesign = this.antDesign.bind(this);
        this.fontAwesome = this.fontAwesome.bind(this);
        this.ionicons = this.ionicons.bind(this);
        this.materialIcons = this.materialIcons.bind(this);
        this.materialCommunityIcons = this.materialCommunityIcons.bind(this);
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

    antDesign() {
        return (<AntDesign
            style={styles.btnImg}
            color={this.state.isFocus ? this.imgColor : this.imgAfterColor}
            name={this.imgName}
            size={this.imgSize}
        />);
    }

    fontAwesome() {
        return (<FontAwesome
            style={styles.btnImg}
            color={this.state.isFocus ? this.imgColor : this.imgAfterColor}
            name={this.imgName}
            size={this.imgSize}
        />);
    }

    ionicons() {
        return (<Ionicons
            style={styles.btnImg}
            color={this.state.isFocus ? this.imgColor : this.imgAfterColor}
            name={this.imgName}
            size={this.imgSize}
        />);
    }

    materialIcons() {
        return (<MaterialIcons
            style={styles.btnImg}
            color={this.state.isFocus ? this.imgColor : this.imgAfterColor}
            name={this.imgName}
            size={this.imgSize}
        />);
    }

    materialCommunityIcons() {
        return (<MaterialCommunityIcons
            style={styles.btnImg}
            color={this.state.isFocus ? this.imgColor : this.imgAfterColor}
            name={this.imgName}
            size={this.imgSize}
        />);
    }

    _onPress() {
        if (this.name === 'SosQ') {
            const previousScr = 'Home';
            const previousScrGr = 'Αρχική';
            const currScr = 'SosQuestions';
            this.nav.navigate(currScr, { beforeScreen: previousScr, beforeScreenGr: previousScrGr });
        }
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this._onPress}
                onShowUnderlay={this._onFocus}
                onHideUnderlay={this._onBlur}
                style={[styles.btn, { backgroundColor: 'rgba(0, 61, 102, 0.5)' }]} >
                <View style={styles.btnContainer}>
                    {
                        this.type === 'aD' ? this.antDesign() :
                            this.type === 'fA' ? this.fontAwesome() :
                                this.type === 'ion' ? this.ionicons() :
                                    this.type === 'matI' ? this.materialIcons() :
                                        this.type === 'matICom' ? this.materialCommunityIcons() : ''
                    }
                    <Text style={styles.btnText}>{this.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        marginBottom: 12, marginHorizontal: 10,
        elevation: 1
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 5,
    },
    btnImg: {
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
});