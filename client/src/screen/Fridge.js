import React, { Component } from 'react';
import axios from 'axios';
import { Button, ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { ApplicationStyles, Metrics, Colors } from '../Containers/Themes'
import { Actions as NavigationActions } from 'react-native-router-flux';



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
                {title: "goldfish", qty: 7},
                {title: "iphone X's", qty: 1}
                ],
            testprop: 'not updated',
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

<<<<<<< HEAD
    // componentDidMount() {
    //     this.getIngredientsData();
    //   }

    // getIngredientsData = () => {
    //     //const { page, seed } = this.state;
    //     const url = 'http://198.199.98.149:5000/api/fridge/3';
    //     this.setState({ loading: true });
    //     axios.get(url)
    //       .then(res => {
    //         this.setState({
    //           data: res.data,
    //           loading: false,
    //           refreshing: false,
    //         });
    //       })
    //       .catch(error => {
    //         console.log(error);
    //         this.setState({ error, loading: false });
    //       });
    //   };

    onPlusButtonPress = () => {
        // this.setState({
        //   testprop: 'button can PLUS'
        // });
        //console.log(this.state.testprop);
        console.log('testtest');
=======
    componentDidMount() {
        //this.getTest();
>>>>>>> af3ed6d194044595dde05dd240f1b4a53728819f
      }

    onMinusButtonPress = () => {
        // this.setState({
        //   testprop: 'button can MINUS'
        // });
        //console.log(this.state.testprop);
        this.console.log('testtestminus');
      }
      
      goToChangeQty = (ingredient) => {
        NavigationActions.view2(ingredient);
        console.log('Navigation router run...');
    }
    
    //`renderRow` function. How each cell/row should be rendered
    //<Text style={styles.label}>{item.description}</Text>
    renderRow ({item}) {
        return (

            <ListItem 
            button 
            onPress={() => this.goToChangeQty(item)}
            roundAvatar
            title={item.title}
            subtitle={`Qty: ${item.qty}`}
            avatar={{ uri: 'https://via.placeholder.com/70x70.jpg' }}
            // containerStyle={{ borderBottomWidth: 0 }}
            // buttonGroup
            // buttonGroupButtons = {['+', '-']}
            // buttonGroupContainerStyle = {{marginRight: 0, marginLeft: 0, height: 30, width: 66, backgroundColor: 'white', borderColor: '#007aff', borderRadius: 5}}
            // buttonGroupContainerBorderRadius = {3}
            // buttonGroupTextStyle = {{color: '#007aff'}}
            // buttonGroupButtonStyle = {{width: 32}}
            // buttonGroupSelectedBackgroundColor = {'#007aff'}
            // buttonGroupSelectedTextStyle = {{color: 'black'}}
            // buttonGroupInnerBorderStyle = {{color: '#0071ff'}}
            // buttonGroupComponent = {TouchableHighlight}
            // buttonGroupActiveOpacity = {0.9}
            // buttonGroupUnderlayColor = {'#D9EBFF'}
            //buttonGroupDisableSelected
            //buttonGroupSelectedIndex = {selectedIndex}
            //onButtonGroupChange = {onButtonGroupChange}
            hideChevron
          />
        //   <View style={styles.row}>
        //     <Text style={styles.boldLabel}>{item.title}</Text>
        //     <Text style={styles.label}>{item.qty}</Text>
        //     <Button
        //     onPress={() => this.onPlusButtonPress}
        //     title="+"
        //     color="#841584"
        //     accessibilityLabel="This manipulates the qty"
        //     />

        //     <Button
        //     onPress={() => this.onMinusButtonPress}
        //     title="-"
        //     color="#841584"
        //     accessibilityLabel="This manipulates the qty"
        //     />

        //   </View>
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
        );
    }
}

export default Fridge;
