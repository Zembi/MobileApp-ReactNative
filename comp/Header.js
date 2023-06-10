import React from 'react';
import { StyleSheet, Text, View, Image, Animated, Alert, Pressable } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// HEADER TITLE
export class HeaderTitle extends React.Component {
    constructor(props) {
        super(props);
        this.currentName = props.title;
        this.leftBtn = props.leftButton;
        this.rightBtn = props.rightButton;
    }

    render() {

        return (
            <View style={headerTitleStyle.header}>
                <View style={headerTitleStyle.leftBarPlace}>{this.leftBtn}</View>
                <Text style={headerTitleStyle.topBarText}>{this.currentName}</Text>
                <View style={headerTitleStyle.rightBarPlace}>{this.rightBtn}</View>
            </View>
        );
    }
}

const headerTitleStyle = StyleSheet.create({
    header: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgb(217, 217, 217)',
        borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
        borderBottomWidth: 2, borderBottomColor: 'rgb(120, 120, 120)',
        marginHorizontal: 0

    },
    leftBarPlace: {
        flex: 0.15,
        alignItems: 'center',
    },
    topBarText: {
        flex: 0.7,
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    rightBarPlace: {
        flex: 0.15,
        alignItems: 'center',
    }
});

// HEADER LEFT BUTTON
export class HeaderLeftBtn extends React.Component {
    constructor(props) {
        super(props);
        this.nav = props.nav;
        this.state = {
            isPressed: false,
        }

        this.updateIsPressed = this.updateIsPressed.bind(this);
    }

    updateIsPressed() {
        this.setState({
            isPressed: !this.state.isPressed,
        });
    }

    render() {

        return (
            <Pressable
                style={[
                    headerLeftBtnsStyle.leftBackContainer,
                    this.state.isPressed ? { backgroundColor: 'rgba(0, 0, 0, 0.3)' } : { backgroundColor: 'transparent' }]
                }
                onPress={this.nav.goBack}
                onPressIn={() => this.updateIsPressed()}
                onPressOut={() => this.updateIsPressed()}
            >
                <AntDesign
                    style={headerLeftBtnsStyle.leftBackImg}
                    color={this.state.isPressed ? 'white' : 'black'}
                    name={'left'}
                    size={25}
                />
                <Text style={headerLeftBtnsStyle.leftBackText}></Text>
            </Pressable>
        );
    }
}

// HEADER RIGHT BUTTON
export class HeaderRightBtn extends React.Component {
    constructor(props) {
        super(props);
        this.action = props.action;
        this.state = {
            isPressed: false,
        }

        this.updateIsPressed = this.updateIsPressed.bind(this);
        this.clickButtonIfDELETE = this.clickButtonIfDELETE.bind(this);
        this.clickButtonIfINFO = this.clickButtonIfINFO.bind(this);
    }

    updateIsPressed() {
        this.setState({
            isPressed: !this.state.isPressed,
        });
    }

    clickButtonIfDELETE() {
        Alert.alert(
            'ΠΡΟΣΟΧΗ!', 'Είσαι σίγουρος πως θες να διαγράψεις όλες τις ερωτήσεις;',
            [
                {
                    text: "ΟΧΙ",
                    style: 'cancel',
                    onPress: () => { }
                },
                {
                    text: 'ΝΑΙ',
                    style: 'default',
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: () => {
                        this.action.funct();
                    }
                },
            ],
        );
    }

    clickButtonIfINFO() {
        this.action.funct();
    }

    render() {

        return (
            <Pressable
                style={[
                    headerRightBtnsStyle.leftBackContainer,
                    this.state.isPressed ? { backgroundColor: 'rgba(0, 0, 0, 0.3)' } : { backgroundColor: 'transparent' }]
                }
                onPress={this.action.type === 'DELETE' ?
                    this.clickButtonIfDELETE :
                    this.action.type === 'INFO' ?
                        this.clickButtonIfINFO
                        : ''}
                onPressIn={() => this.updateIsPressed()}
                onPressOut={() => this.updateIsPressed()}
            >
                <Text style={headerRightBtnsStyle.leftBackText}></Text>
                {this.action.type === 'DELETE' ?
                    <MaterialCommunityIcons
                        style={headerRightBtnsStyle.leftBackImg}
                        color={this.state.isPressed ? 'white' : 'black'}
                        name={'delete-sweep'}
                        size={28}
                    />
                    :
                    this.action.type === 'INFO' ?
                        <MaterialCommunityIcons
                            style={headerRightBtnsStyle.leftBackImg}
                            color={this.state.isPressed ? 'white' : 'black'}
                            name={'head-dots-horizontal-outline'}
                            size={25}
                        />
                        :
                        ''
                }
            </Pressable>
        );
    }
}

const headerLeftBtnsStyle = StyleSheet.create({
    leftBackContainer: {
        flexDirection: 'row',
        borderRadius: 30,
        padding: 4, paddingRight: 5,
    },
    leftBackImg: {

    },
    leftBackText: {
        fontSize: 16
    }
});

const headerRightBtnsStyle = StyleSheet.create({
    leftBackContainer: {
        flexDirection: 'row',
        borderRadius: 30,
        padding: 5,
    },
    leftBackImg: {
        transform: [{ rotateY: '180deg' }]
    },
    leftBackText: {
        fontSize: 16
    }
});