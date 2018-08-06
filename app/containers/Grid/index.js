/**
 *
 * Grid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Row from 'components/Row';
import Cell from 'components/Cell';

import { generateGrid, generateIDList } from 'helpers';

import injectReducer from 'utils/injectReducer';
import makeSelectGrid from './selectors';
import reducer from './reducer';
import style from './style.scss';

import { createGrid, createIDList } from './actions';

export class Grid extends React.Component {
  componentDidMount() {
    // Generate grid
    this.props.createGrid(generateGrid(this.props.grid.size));
    // Generate static list of unique keys for the rows.
    // Usually the server do it for us and gives us the items
    // with the unique IDs. It's needed for perfomance.
    this.props.createIDList(generateIDList(this.props.grid.size));
  }

  render() {
    return (
      <div className={style.grid}>
        <Helmet>
          <title>Grid</title>
          <meta name="description" content="Description of Grid" />
        </Helmet>
        {this.props.grid.layout.map((row, index) => (
          <Row key={this.props.grid.idList[index]}>
            {row.map(cell => <Cell key={cell.id} cell={cell} />)}
          </Row>
        ))}
      </div>
    );
  }
}

Grid.propTypes = {
  grid: PropTypes.shape({
    size: PropTypes.number,
    layout: PropTypes.array,
    idList: PropTypes.array,
  }),
  createGrid: PropTypes.func,
  createIDList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  grid: makeSelectGrid(),
});

function mapDispatchToProps(dispatch) {
  return {
    createGrid: layout => dispatch(createGrid(layout)),
    createIDList: idList => dispatch(createIDList(idList)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'grid', reducer });

export default compose(
  withReducer,
  withConnect,
)(Grid);
