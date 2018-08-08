/**
 *
 * Grid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Row from 'components/Row';
import Cell from 'components/Cell';

import { generateGrid, generateIDList } from 'helpers/generators';
import { buildShip } from 'helpers/builders';
import { checkNearCells } from 'helpers/checkers';

import injectReducer from 'utils/injectReducer';
import makeSelectGrid from './selectors';
import reducer from './reducer';
import style from './style.scss';

import { createGrid, createIDList, placeShip, checkCells } from './actions';

export class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  async componentDidMount() {
    // Generate grid
    await this.props.createGrid(generateGrid(this.props.grid.size));
    // Generate static list of unique keys for the rows.
    // Usually the server do it for us and gives us the items
    // with the unique IDs. It's needed for perfomance.
    await this.props.createIDList(generateIDList(this.props.grid.size));

    // Build ships and place them on the board
    await this.buildShips();
  }

  buildShips() {
    const ships = ['normal', 'LShaped', 'dotShaped', 'dotShaped'];
    ships.forEach(type => {
      const ship = buildShip(this.props.grid.layout, type);
      this.props.placeShip(ship.shipCoords, ship.occupiedCoords);
    });
    // const ship = buildShip(this.props.grid.layout, 'LShaped');
    // this.props.placeShip(ship.shipCoords, ship.occupiedCoords);
  }

  onClick(cell, rowIndex, cellIndex) {
    console.log(cell);
    console.log(rowIndex);
    console.log(cellIndex);
    if (!cell.checked) {
      const cells = checkNearCells(
        rowIndex,
        cellIndex,
        this.props.grid.layout,
        'collect',
      );
      console.log(cells);
      if (cell.isShip) {
        this.props.checkCells(cells);
      } else {
        this.props.checkCells([[rowIndex, cellIndex]]);
      }
    }
  }

  render() {
    return (
      <div className={style.grid}>
        {this.props.grid.layout.map((row, rowIndex) => (
          <Row key={this.props.grid.idList[rowIndex]}>
            {row.map((cell, cellIndex) => (
              <Cell
                onClick={() => this.onClick(cell, rowIndex, cellIndex)}
                key={cell.id}
                cell={cell}
              />
            ))}
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
  placeShip: PropTypes.func,
  checkCells: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  grid: makeSelectGrid(),
});

function mapDispatchToProps(dispatch) {
  return {
    createGrid: layout => dispatch(createGrid(layout)),
    createIDList: idList => dispatch(createIDList(idList)),
    placeShip: (shipCoords, occupiedCoords) =>
      dispatch(placeShip(shipCoords, occupiedCoords)),
    checkCells: cells => dispatch(checkCells(cells)),
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
