import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class Fridge extends Component {
    constructor() {
        super();
        this.state = {
            status: 'test Opening the Fridge',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.status}</Text>
            </View>
        );
    }
}

export default Fridge;
