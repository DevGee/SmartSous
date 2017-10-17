import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { ListItem } from 'react-native-elements';


class RecipeRow extends PureComponent {
  render() {
    return (
      <ListItem
        roundAvatar
        title={this.props.firstname}
        subtitle={this.props.email}
        avatar={{ uri: 'https://via.placeholder.com/70x70.jpg' }}
        containerStyle={{ borderBottomWidth: 0 }}
      />
    );
  }
}

export default RecipeRow;
