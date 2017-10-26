import React, { PureComponent } from 'react';
import { ListItem } from 'react-native-elements';

class IngredientRow extends PureComponent {
  render() {
    return (
        <ListItem
          roundAvatar
          title={this.props.title}
          subtitle={`Quantity: ${this.props.qty}`}
          avatar={{ uri: 'https://via.placeholder.com/70x70.jpg' }}
          onPress={this.props.onPress}
        />
    );
  }
}

export default IngredientRow;