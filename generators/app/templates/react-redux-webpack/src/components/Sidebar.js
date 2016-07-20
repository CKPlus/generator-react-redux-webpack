import React, { PropTypes, Component} from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import {
  Colors,
  Spacing,
  Typography,
} from 'material-ui/lib/styles';
import {StylePropable} from 'material-ui/lib/mixins';


const SelectableList = SelectableContainerEnhance(List);


class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  handleRequestChangeLink(event, value) {
    window.location = value;
  }


  static propTypes = {
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    onRequestChangeList: React.PropTypes.func.isRequired,
    // style: React.PropTypes.object,
  };

  getStyles() {
    return {
      leftNav: {
        position: 'fixed',
        top: '64px',
        left: 0,
        width: '200px',
        height: '100vh'
      },
      menuSubHeader: {
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '48px',
        paddingLeft: 16
      }
    };
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _onLeftNavChange(e, key, payload) {
    this.context.history.pushState(null, payload.route);
  }

  _onHeaderClick() {
    this.context.history.pushState(null, '/');
    this.refs.leftNav.close();
  }

  _getSelectedIndex() {
    let currentItem;
    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.history.isActive(currentItem.route)){ 
         return i;
      }
    }
  }

  render() {
    const {
      onRequestChangeList,
      location
    } = this.props;

    return (
      <LeftNav open={true} style={this.getStyles().leftNav} >
        <SelectableList
          valueLink={{value: location.pathname, requestChange: onRequestChangeList }}
        >
          <div style={this.getStyles().menuSubHeader}>Sidebar</div>
          <ListItem primaryText="Home" value="/home"/>
          <ListItem primaryText="Information" value="/info"/>
        </SelectableList>
      </LeftNav>
    );
  }
}

export default Sidebar;
