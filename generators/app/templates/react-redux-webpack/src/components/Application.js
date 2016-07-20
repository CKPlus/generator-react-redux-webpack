import React, { Component, PropTypes } from 'react';
import Sidebar from './Sidebar';
import mui from 'material-ui';
import { connect } from 'react-redux';
import { AppBar } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';


const {Dialog, FlatButton, IconMenu, IconButton, MenuItem} = mui;


class Application extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    children: React.PropTypes.node,
    history: React.PropTypes.object,
    location: React.PropTypes.object,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  getStyles() {
    return {
      padding: '20px',
      marginLeft: '210px'
    };
  }


  handleRequestChangeList(event, value) {
    this.props.history.push(value);
  }

  render() {
    const {
      history,
      location,
      children,
    } = this.props;

    return (
      <div>
        <AppBar style={{position: 'fixed'}}
                title={process.env.appbar_title}
                iconElementRight={
                  <IconMenu
                    iconButtonElement={
                      <IconButton><MoreVertIcon/></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="Settings"/>
                  </IconMenu>
                }
                showMenuIconButton={false} />
        <Sidebar
          ref="sideBar"
          history={history}
          location={location}
          onRequestChangeList={this.handleRequestChangeList.bind(this)} />
        <div style={this.getStyles()}>
          { this.props.children }
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps
)(Application);

