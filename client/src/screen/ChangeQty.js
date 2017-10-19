import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class ChangeQty extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <Text>This is the changeQty Screen</Text>
        <Text style={styles.boldLabel}>{item.title}</Text>
        <Text style={styles.label}>{item.qty}</Text>
        <Button
            onPress={() => this.onPlusButtonPress}
            title="+"
            color="#841584"
            accessibilityLabel="This manipulates the qty"
            />

            <Button
            onPress={() => this.onMinusButtonPress}
            title="-"
            color="#841584"
            accessibilityLabel="This manipulates the qty"
            />
      </View>
    );
  }
}

export default Home;