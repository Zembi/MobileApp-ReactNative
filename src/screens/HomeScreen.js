import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, RefreshControl, ScrollView, ImageBackground, FlatList, Button, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import HomeScreenBtn from '../../comp/HomeScreenBtn';
import InfoWindow from '../../comp/InfoWindow';


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.forNavigation = this.props.navigation;
        this.state = {
            optionValue: null,
            isDropdownFocus: false,
            isBtnFocus: false
        }
        this.options = [];

        this.titleOfApp = 'ΕΣΤΙΑΤΟΡΑΣ';

        //DROPDOWN LIST
        this._onDropdownFocus = this._onDropdownFocus.bind(this);
        this._onDropdownBlur = this._onDropdownBlur.bind(this);
        this.updateOptionValue = this.updateOptionValue.bind(this);
        this.updateFocus = this.updateFocus.bind(this);

        // CHOOSE TEST BUTTON
        this._onBtnFocus = this._onBtnFocus.bind(this);
        this._onBtnBlur = this._onBtnBlur.bind(this);
    }

    _onDropdownFocus() {
        if (!this.state.isDropdownFocus) {
            this.setState({
                isDropdownFocus: true,
            });
        }
    }

    _onDropdownBlur() {
        if (this.state.isDropdownFocus) {
            this.setState({
                isDropdownFocus: false,
            });
        }
    }

    updateOptionValue(arg) {
        this.setState({ optionValue: arg });
    }

    updateFocus(arg) {
        this.setState({ isDropdownFocus: arg });
    }

    _onBtnFocus() {
        if (!this.state.isBtnFocus) {
            this.setState({
                isBtnFocus: true,
            });
        }
    }

    _onBtnBlur() {
        if (this.state.isBtnFocus) {
            this.setState({
                isBtnFocus: false,
            });
        }
    }

    _pickedTest() {

    }

    componentDidMount() {
        // OPTIONS FOR DROPDOWNLIST 
        const Test = (msg) => {
            return msg;
        }
        const tests = [Test('Test 1'), Test('Test 2'), Test('Test 3'), Test('Test 4')];
        tests.map((test) => {
            this.options.push({ label: test, value: test });
        });

        this.updateOptionValue(this.options[0].value);
    }

    render() {
        // DATA FOR HOME BUTTONS
        const dataLeft = [
            {
                id: 'aaa-000',
                name: 'SosQ',
                title: 'ΕΡΩΤΗΣΕΙΣ ΠΟΥ ΑΞΙΖΟΥΝ',
                type: 'ion',
                iconName: 'library-sharp'
            },
            {
                id: 'aaa-001',
                name: 'StoreQ',
                title: 'ΑΠΟΘΗΚΗ ΓΝΩΣΕΩΝ',
                type: 'matI',
                iconName: 'sd-storage'
            },
            {
                id: 'aaa-002',
                name: 'MoreInfo',
                title: 'ΠΕΡΙΣΣΟΤΕΡΕΣ ΠΛΗΡΟΦΟΡΙΕΣ',
                type: 'ion',
                iconName: 'ios-information-circle'
            },
        ];
        const dataRight = [
            {
                id: 'aaa-003',
                name: 'WrongQ',
                title: 'ΕΣΤΙΑΣΕ ΣΤΑ ΛΑΘΗ ΣΟΥ',
                type: 'matI',
                iconName: 'filter-center-focus'
            },
            {
                id: 'aaa-004',
                name: 'PowerUp',
                title: 'ΕΝΙΣΧΥΣΕ ΤΙΣ ΓΝΩΣΕΙΣ ΣΟΥ',
                type: 'ion',
                iconName: 'rocket',
            },
            {
                id: 'aaa-005',
                name: 'Sett',
                title: 'ΡΥΘΜΙΣΕΙΣ\n',
                type: 'ion',
                iconName: 'md-settings'
            },
        ];

        const msgOfWindow = 'Σκοπός της εφαρμογής, μέσω ενός ολοκληρωμένου συνόλου ερωτήσεων, είναι να λυθεί οποιαδήποτε απορία σχετικά με την εστίαση ως σέρβις';
        const animForInfoWind = {
            status: true,
            duration: 1500,
            delay: 0
        };

        return (
            <SafeAreaView style={[styles.container]}>
                {/* HEADER */}
                <View style={basicStyles.header}>
                    <Text style={basicStyles.topBar}>{this.titleOfApp}</Text>
                </View>

                {/* BODDY */}
                <ImageBackground source={require('../../assets/AI/Bing1-Resz.jpg')} resizeMode="cover" style={styles.imgBackground}>
                    <View style={styles.wholeScreen} >
                        <View style={styles.mainContainer}>
                            <View style={styles.firstMainPart}>
                                <View style={styles.dropdownListLine}>
                                    <Text style={styles.dropdownListTestSide}>Επίλεξε ΤΕΣΤ:</Text>
                                    <Dropdown style={[styles.dropdownList, this.state.isDropdownFocus && { borderColor: 'black', borderWidth: 2 }]}
                                        containerStyle={styles.dropdownListContainer}
                                        placeholderStyle={extraStyles.placeholderStyle}
                                        selectedTextStyle={[extraStyles.selectedTextStyle, this.state.isDropdownFocus && { color: 'grey' }]}
                                        inputSearchStyle={extraStyles.inputSearchStyle}
                                        iconStyle={extraStyles.iconStyle}
                                        data={this.options}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        value={this.state.optionValue}
                                        placeholder=''
                                        searchPlaceholder="Αναζήτηση..."
                                        onFocus={this._onDropdownFocus}
                                        onBlur={this._onDropdownBlur}
                                        onChange={item => {
                                            this.updateOptionValue(item.value);
                                            this.updateFocus(false);
                                        }}
                                        renderLeftIcon={() => (
                                            <MaterialCommunityIcons
                                                style={extraStyles.icon}
                                                color={this.state.isDropdownFocus ? 'black' : 'grey'}
                                                name="ab-testing"
                                                size={20}
                                            />
                                        )}
                                        itemContainerStyle={extraStyles.itemsInDropdownListContainer}
                                        itemTextStyle={extraStyles.itemsInDropdownList}
                                    />
                                    <TouchableHighlight
                                        onPress={this._pickedTest}
                                        onShowUnderlay={this._onBtnFocus}
                                        onHideUnderlay={this._onBtnBlur}
                                        underlayColor='black'
                                        style={styles.dropdownListBtnChoose}>
                                        <View style={styles.dropdownListBtnView}>
                                            <AntDesign
                                                style={styles.dropdownListBtnImg}
                                                color={this.state.isBtnFocus ? 'rgb(0, 138, 230)' : 'white'}
                                                name="caretright"
                                                size={30}
                                            />
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <ImageBackground source={require('../../assets/AI/Bing7.jpg')} resizeMode="cover" style={styles.imgLandscapeBackground}></ImageBackground>
                            </View>
                            <View style={styles.secondMainPart}>
                                <InfoWindow msg={msgOfWindow} animation={animForInfoWind} status={true} />
                                <View style={styles.btnsContainer}>
                                    <View style={styles.btnsContainerLeft}>
                                        <HomeScreenBtn style={{ height: 100 }} item={dataLeft[0]} nav={this.forNavigation} />
                                        <HomeScreenBtn style={{ height: 100 }} item={dataLeft[1]} nav={this.forNavigation} />
                                        <HomeScreenBtn style={{ height: 100 }} item={dataLeft[2]} nav={this.forNavigation} />
                                    </View>
                                    <View style={styles.btnsContainerMiddle}></View>
                                    <View style={styles.btnsContainerRight}>
                                        <HomeScreenBtn style={{ height: 100 }} item={dataRight[0]} nav={this.forNavigation} />
                                        <HomeScreenBtn style={{ height: 100 }} item={dataRight[1]} nav={this.forNavigation} />
                                        <HomeScreenBtn style={{ height: 100 }} item={dataRight[2]} nav={this.forNavigation} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                {/* FOOTER */}
                <View style={basicStyles.footer}></View>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imgBackground: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    wholeScreen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight
            }
        })
    },
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
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 15
    },
    firstMainPart: {
        flex: 2.5,
        flexDirection: 'row-reverse',
        width: '85%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        opacity: 0.9,
        alignSelf: 'center',
        borderRadius: 5,
        // borderWidth: 2, borderColor: 'white',
        overflow: 'hidden',
        elevation: 5
    },

    dropdownListLine: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingVertical: 5, paddingHorizontal: 5,
        elevation: 1,
    },
    dropdownListTestSide: {
        flex: 0,
        alignSelf: 'center',
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 4
    },
    dropdownList: {
        flex: 1,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 3,
        paddingHorizontal: 8,
        marginBottom: 4
    },
    dropdownListContainer: {
        backgroundColor: 'rgb(217, 217, 217)'
    },
    dropdownListBtnChoose: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 46, 77)',
        color: 'white',
        borderRadius: 3,
        overflow: 'hidden',
        padding: 0
    },
    dropdownListBtnView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    dropdownListBtnImg: {
    },

    imgLandscapeBackground: {
        flex: 1,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        borderWidth: 1, borderRightWidth: 4, borderColor: 'white',
        borderRadius: 5, borderTopRightRadius: 0, borderBottomRightRadius: 0,
    },

    secondMainPart: {
        flex: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 8
    },
    btnsContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        marginVertical: 0
    },
    btnsContainerLeft: {
        flex: 1,
        elevation: 1,
        paddingVertical: 10
    },
    btnsContainerMiddle: {
        flex: 0.01,
    },
    btnsContainerRight: {
        flex: 1,
        elevation: 1,
        overflow: 'hidden',
        paddingVertical: 10
    }
});


const extraStyles = StyleSheet.create({
    shadowStyling: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: 'grey',
        shadowOpacity: 1,
        elevation: 100
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        color: 'grey',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputSearchStyle: {
        fontSize: 16,
        textAlign: 'center'
    },
    itemsInDropdownListContainer: {
        borderTopWidth: 1, borderColor: 'black'
    },
    itemsInDropdownList: {
        fontSize: 18,
        textAlign: 'center',
        padding: 0
    },
    selectedTextStyle: {
        fontSize: 18,
        textAlign: 'center'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
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