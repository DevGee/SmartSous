import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { ListItem } from 'react-native-elements';


class RecipeRow extends PureComponent {
  render() {
    return (
      <ListItem
        roundAvatar
        title={this.props.title}
        subtitle={`Cook Time: ${this.props.cooktime} min\nServings: ${this.props.servings}`}
        subtitleNumberOfLines={2}
        avatar={{ uri: this.props.url }}
        onPress={this.props.clickList}
        containerStyle={{ borderBottomWidth: 0 }}
      />
    );
  }
}

export default RecipeRow;
