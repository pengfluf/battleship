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
import Overlay from 'components/Overlay';
import FinalCaption from 'components/FinalCaption';
import StartPane from 'components/StartPane';

import generateGrid from 'helpers/generators/generateGrid';
import generateIDList from 'helpers/generators/generateIDList';
import buildShip from 'helpers/builders/buildShip';
import checkNearCells from 'helpers/checkers/checkNearCells';

import injectReducer from 'utils/injectReducer';
import makeSelectGrid from './selectors';
import reducer from './reducer';
import style from './style.scss';

import {
  startGame,
  createGrid,
  createIDList,
  placeShip,
  checkCells,
  damageShip,
} from './actions';

export class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  async componentDidMount() {
    await this.props.createIDList(generateIDList(this.props.grid.size));

    // Generate grid
    await this.props.createGrid(generateGrid(this.props.grid.size));

    // Build ships and place them on the board
    await this.buildShips();
  }

  buildShips() {
    const ships = ['normal', 'LShaped', 'dotShaped', 'dotShaped'];
    ships.forEach((type, index) => {
      const ship = buildShip(this.props.grid.layout, type);
      this.props.placeShip(
        ship.shipCoords,
        ship.occupiedCoords,
        ship.shipCoords.length,
        `${type}${index}`,
      );
    });
  }

  onClick(cell, rowIndex, cellIndex) {
    if (!cell.checked) {
      const cells = checkNearCells(
        rowIndex,
        cellIndex,
        this.props.grid.layout,
        'collect',
      );
      if (cell.isShip) {
        this.props.checkCells(cells);
        this.props.damageShip();
      } else {
        this.props.checkCells([[rowIndex, cellIndex]]);
      }
    }
  }

  render() {
    if (this.props.grid.gameStarted) {
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
          {this.props.grid.remainingShipNum === 0 ? (
            <Overlay>
              <FinalCaption />
            </Overlay>
          ) : null}
        </div>
      );
    }
    return <StartPane onClick={this.props.startGame} />;
  }
}

Grid.propTypes = {
  grid: PropTypes.shape({
    gameStarted: PropTypes.bool,
    size: PropTypes.number,
    layout: PropTypes.array,
    idList: PropTypes.array,
    remainingShipNum: PropTypes.number,
  }),
  startGame: PropTypes.func,
  createGrid: PropTypes.func,
  createIDList: PropTypes.func,
  placeShip: PropTypes.func,
  checkCells: PropTypes.func,
  damageShip: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  grid: makeSelectGrid(),
});

function mapDispatchToProps(dispatch) {
  return {
    startGame: () => dispatch(startGame()),
    createGrid: layout => dispatch(createGrid(layout)),
    createIDList: idList => dispatch(createIDList(idList)),
    placeShip: (shipCoords, occupiedCoords, shipLength, shipName) =>
      dispatch(placeShip(shipCoords, occupiedCoords, shipLength, shipName)),
    checkCells: cells => dispatch(checkCells(cells)),
    damageShip: () => dispatch(damageShip()),
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
