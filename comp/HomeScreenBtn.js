import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated, InteractionManager, Pressable } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default class HomeScreenBtn extends React.Component {
    constructor(props) {
        super(props);
        this.infoOfBtn = props.infoOfBtn;
        this.id = props.item.id;
        this.name = props.item.name;
        this.title = props.item.title;
        this.type = props.item.type;
        this.imgName = props.item.iconName;
        this.nav = props.nav;
        this.questionsFromJson = props.questionsFromJson;
        this.updateLoad = props.updateLoad;
        this.state = {
            isFocus: false,
            comeInAnim: new Animated.Value(0),
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
        this.updateLoad();
        setTimeout(() => {
            this.updateLoad();
            if (this.name === 'SosQ') {
                const currScr = 'SosQuestions';
                this.nav.navigate(currScr, { questionsFromJson: this.questionsFromJson, });
            }
            else if (this.name === 'StoredQ') {
                const currScr = 'StoredQuestions';
                this.nav.navigate(currScr, { questionsFromJson: this.questionsFromJson, });
            }
            else if (this.name === 'WrongQ') {
                const currScr = 'WrongQuestions';
                this.nav.navigate(currScr, { questionsFromJson: this.questionsFromJson, });
            }
        }, 10)
    }

    componentDidMount() {
        Animated.timing(this.state.comeInAnim, { toValue: 1, delay: this.infoOfBtn.num * 100, duration: 500, useNativeDriver: true }).start();
    }

    render() {
        const val = this.state.comeInAnim.interpolate({
            inputRange: [0, 1],
            outputRange: this.infoOfBtn.pos === 'left' ? [-300, 0] : [300, 0],
        });

        return (
            <Animated.View style={[styles.wrapBtn, { transform: [{ translateX: val }] }]}>
                <Pressable
                    onPress={this._onPress}
                    onPressIn={this._onFocus}
                    onPressOut={this._onBlur}
                    style={[
                        styles.btn,
                        this.state.isFocus ? { backgroundColor: 'black' } : { backgroundColor: 'rgba(0, 61, 102, 0.5)' }
                    ]} >
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
                </Pressable>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    wrapBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        overflow: 'hidden',
        marginBottom: 12, marginHorizontal: 10,
        elevation: 1
    },
    btn: {
        width: '100%', height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1
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