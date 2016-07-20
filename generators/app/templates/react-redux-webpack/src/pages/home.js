import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import mui from 'material-ui'
import * as homeActions from '../actions/homeActions';

import { Link } from 'react-router';

const {
  Table,
  TableRow,
  TableHeader,
  TableRowColumn,
  TableHeaderColumn,
  TableBody
} = mui;

class Home extends Component {

  static propTypes = {
    location: React.PropTypes.object.isRequired,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  getStyles() {
    return {
      root: {
        paddingTop: 64
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(homeActions.load())
  }

  constructor(props) {
    super(props);
  }


  render() {
    let styles = this.getStyles(),
        { feed } = this.props

    let tableRow = feed.entry ? feed.entry.map((item, idx) => {
      return <TableRow key={`row_${idx}`}>
              <TableRowColumn>{idx + 1}</TableRowColumn>
              <TableRowColumn>
                <img src={item['im:image'][0]['label']}/>
              </TableRowColumn>
              <TableRowColumn>
                {item['im:name']['label']}
              </TableRowColumn>
              <TableRowColumn>{item['category']['attributes']['label']}</TableRowColumn>
            </TableRow>
    }) : []

    return <div style={styles.root}>
      <h2>Home</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Cover</TableHeaderColumn>
            <TableHeaderColumn>Album Name</TableHeaderColumn>
            <TableHeaderColumn>Category</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRow}
        </TableBody>
      </Table>
     
    </div>
  }
}

function mapStateToProps(state) {
  return {
    feed: state.home.feed
  };
}

export default connect(
  mapStateToProps
)(Home);

