import React, { Component } from 'react';
import { Button, ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { ApplicationStyles, Metrics, Colors } from '../Containers/Themes'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flex: 1,
        backgroundColor: Colors.fire,
        marginVertical: Metrics.smallMargin,
        justifyContent: 'center'
      },
      boldLabel: {
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Colors.snow,
        textAlign: 'center',
        marginBottom: Metrics.smallMargin
      },
      label: {
        textAlign: 'center',
        color: Colors.snow
      },
      listContent: {
        marginTop: Metrics.baseMargin
      }
});

class Fridge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'test Opening the Fridge',
            loading: false,
            data: [
                {title: "eggs", qty: 5}, 
                {title: "bacon", qty: 2}, 
                {title: "goldfish", qty: 7}
                ],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    //onButtonPress = () => {
        // this.setState({
        //   text: this.state.mimin
        // });
      //}

    //`renderRow` function. How each cell/row should be rendered
    //<Text style={styles.label}>{item.description}</Text>
    renderRow ({item}) {
        return (
          <View style={styles.row}>
            <Text style={styles.boldLabel}>{item.title}</Text>
            <Text style={styles.label}>{item.qty}</Text>
            <Button
            onPress={console.log("does this work?")}
            title="+/-"
            color="#841584"
            accessibilityLabel="This manipulates the qty"
            />
          </View>
        )
      }

// Render a header?
renderHeader = () =>
<Text style={[styles.label, styles.sectionHeader]}>My Ingredients</Text>

// Render a footer?
renderFooter = () =>
<Text style={[styles.label, styles.sectionHeader]}>Want more food?</Text>

// Show this when data is empty
renderEmpty = () =>
<Text style={styles.label}> - Nothing to See Here - </Text>

renderSeparator = () =>
<Text style={styles.label}> - ~~~~~ - </Text>

// The default function if no Key is provided is index
// an identifiable key is important if you plan on
// item reordering.  Otherwise index is fine
keyExtractor = (item, index) => index

// How many items should be kept im memory as we scroll?
oneScreensWorth = 20


    render() {

        if (this.state.loading) {
            return (
              <View style={styles.container}>
                <ActivityIndicator size="large"/>
              </View>
            );
          }

        return (
            // <View style={styles.container}>
            //     <Text>{this.state.status}</Text>
            // </View>

            <List>
                <FlatList 
                data={this.state.data}
                renderItem={this.renderRow}
                keyExtractor={this.keyExtractor}
                initialNumToRender={this.oneScreensWorth}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                ListEmptyComponent={this.renderEmpty}
                ItemSeparatorComponent={this.renderSeparator}
                />
            </List> 
        );
    }
}

export default Fridge;
