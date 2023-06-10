import React from "react";
import { View, Text, Animated, StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

export default class EmptyQues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyFolderAnim: new Animated.Value(0.1),
        }
    }

    componentDidMount() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.emptyFolderAnim, { toValue: 1, delay: 200, duration: 4000, useNativeDriver: true }),
                Animated.timing(this.state.emptyFolderAnim, { toValue: 0.1, delay: 200, duration: 3000, useNativeDriver: true }),
            ])
        ).start();
    }

    render() {
        return (
            <View style={styles.listOfQuestionsEmptyWrapper}>
                <Animated.View style={{ opacity: this.state.emptyFolderAnim, marginTop: -50 }}>
                    <FontAwesome
                        color={'black'}
                        name={'folder-open'}
                        size={100}
                    />
                </Animated.View>
                <Text style={styles.listOfQuestionsEmpty}>ΚΑΜΙΑ ΕΡΩΤΗΣΗ ΑΚΟΜΑ...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listOfQuestionsEmptyWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    listOfQuestionsEmpty: {
        fontSize: 20,
    },
});