import { View, StyleSheet, Animated } from "react-native";
import { AntDesign, MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import React from "react";

export class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cycleAnim: new Animated.Value(0),
        }
    }

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.state.cycleAnim, { toValue: 1, delay: 0, duration: 200, useNativeDriver: true })
        ).start();
    }

    render() {
        const finalVal = this.state.cycleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        return (
            <View style={styles.wrapperLoader}>
                <Animated.View style={[
                    styles.loader,
                    { transform: [{ rotate: finalVal }] }
                ]}>
                    <AntDesign
                        color={'white'}
                        name="loading1"
                        size={80}
                    />
                </Animated.View>
            </View >
        );

    }
}

const styles = StyleSheet.create({
    wrapperLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    loader: {
    },
});