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
import nanoid from 'nanoid';

import Row from 'components/Row';
import Cell from 'components/Cell';

import { generateGrid } from 'helpers';

import injectReducer from 'utils/injectReducer';
import makeSelectGrid from './selectors';
import reducer from './reducer';

import { createGrid } from './actions';

export class Grid extends React.Component {
  componentDidMount() {
    this.props.createGrid(generateGrid(10));
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Grid</title>
          <meta name="description" content="Description of Grid" />
        </Helmet>
        {this.props.grid.layout.map(row => (
          <Row key={nanoid(3)}>
            {row.map(cell => <Cell key={cell.id}>x</Cell>)}
          </Row>
        ))}
      </div>
    );
  }
}

Grid.propTypes = {
  grid: PropTypes.shape({
    layout: PropTypes.array,
  }),
  createGrid: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  grid: makeSelectGrid(),
});

function mapDispatchToProps(dispatch) {
  return {
    createGrid: layout => dispatch(createGrid(layout)),
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
