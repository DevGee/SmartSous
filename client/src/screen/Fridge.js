import React, { Component } from 'react';
import axios from 'axios';
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
        backgroundColor: Colors.windowTint,
        marginVertical: Metrics.smallMargin,
        justifyContent: 'center'
      },
      boldLabel: {
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#000',
        textAlign: 'center',
        marginBottom: Metrics.smallMargin
      },
      label: {
        textAlign: 'center',
        color: '#000'
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
            testprop: 'not updated',
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        this.getTest();
      }

    getData = () => {
        //const { page, seed } = this.state;
        const url = '198.199.98.149:5000/api/fridge/3';
        this.setState({ loading: true });
        axios.get(url)
          .then(res => {
            this.setState({
              data: res.data,
              loading: false,
              refreshing: false,
            });
          })
          .catch(error => {
            console.log(error);
            this.setState({ error, loading: false });
          });
      };

    onButtonPress = () => {
        this.setState({
          testprop: 'button can set state'
        });
        console.log(this.state.testprop);
      }

    //`renderRow` function. How each cell/row should be rendered
    //<Text style={styles.label}>{item.description}</Text>
    renderRow ({item}) {
        return (
          <View style={styles.row}>
            <Text style={styles.boldLabel}>{item.title}</Text>
            <Text style={styles.label}>{item.qty}</Text>
            <Button
            onPress={this.onButtonPress}
            title="+/-"
            color="#841584"
            accessibilityLabel="This manipulates the qty"
            />
          </View>
        )
      }

// Render a header?
renderHeader = () =>
<Text style={[styles.label, styles.sectionHeader]}>{this.state.testprop}</Text>

// Render a footer?
renderFooter = () =>
<Text style={[styles.label, styles.sectionHeader]}></Text>

// Show this when data is empty
renderEmpty = () =>
<Text style={styles.label}> - Nothing to See Here - </Text>

renderSeparator = () =>
<Text style={styles.label}></Text>

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
<<<<<<< HEAD
            </List>
=======

>>>>>>> 7c2d7d0f528b37c5bebae7ce3798f0a3a7924414
        );
    }
}

export default Fridge;
