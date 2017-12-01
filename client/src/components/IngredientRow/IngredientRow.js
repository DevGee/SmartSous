import React, { PureComponent } from 'react';
import { ListItem } from 'react-native-elements';

class IngredientRow extends PureComponent {
  render() {
    return (
        <ListItem
          roundAvatar
          title={this.props.title}
          subtitle={`Quantity: ${this.props.qty}`}
          avatar={{ uri: 'https://png.icons8.com/vegetarian-food/win10/100' }}
          onPress={this.props.onPress}
        />
    );
  }
}

export default IngredientRow;
