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

import calcRandomUnchecked from 'helpers/calcs/calcRandomUnchecked';

import injectReducer from 'utils/injectReducer';
import makeSelectGrid from './selectors';
import reducer from './reducer';
import style from './style.scss';

import {
  startGame,
  allowTurn,
  forbidTurn,
  createGrid,
  createIDList,
  placeShip,
  checkCells,
  damageShip,
} from './actions';

export class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.makeTurn = this.makeTurn.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.reset();
  }

  buildShips() {
    const ships = [
      {
        name: 'normal',
        color: 'rgba(236, 64, 122, 0.5)',
      },
      {
        name: 'LShaped',
        color: 'rgba(102, 187, 106, 0.5)',
      },
      {
        name: 'dotShaped',
        color: 'rgba(255, 167, 38, 0.5)',
      },
      {
        name: 'dotShaped',
        color: 'rgba(126, 87, 194, 0.5)',
      },
    ];
    ships.forEach((item, index) => {
      const ship = buildShip(this.props.grid.layout, item.name);
      this.props.placeShip(
        ship.shipCoords,
        ship.occupiedCoords,
        ship.shipCoords.length,
        `${item.name}${index}`,
        item.color,
      );
    });
  }

  async userTurn(cell, rowIndex, cellIndex) {
    if (cell.isShip) {
      const cells = checkNearCells(
        rowIndex,
        cellIndex,
        this.props.grid.layout,
        'collect',
      );
      await this.props.checkCells(cells);
      await this.props.damageShip(cell.shipName);
    } else {
      await this.props.checkCells([[rowIndex, cellIndex]]);
    }
  }

  async computerTurn(cell, layout) {
    // Forbid user to turn and let the computer make it.
    // User turn will be allowed after computers'
    // operations are done.
    await this.props.forbidTurn();

    // If we damage the ship, computer can't make the
    // next turn, otherwise it obviously can.
    if (!cell.isShip) {
      const randomCellCoords = await calcRandomUnchecked(layout);
      const [y, x] = [randomCellCoords[0], randomCellCoords[1]];
      const randomCell = layout[y][x];

      // Delay for human beings, computer is too fast
      const timerId = setInterval(() => {
        this.userTurn(randomCell, y, x);
      }, 500);
      setTimeout(() => {
        clearInterval(timerId);
        this.props.allowTurn();
      }, 500);
    } else {
      this.props.allowTurn();
    }
  }

  async makeTurn(cell, rowIndex, cellIndex) {
    if (this.props.grid.canTurn && !cell.checked) {
      const { layout } = this.props.grid;
      // Our turn.
      await this.userTurn(cell, rowIndex, cellIndex);
      // Computers' turn.
      await this.computerTurn(cell, layout);
    }
  }

  async reset() {
    await this.props.createIDList(generateIDList(this.props.grid.size));
    // Generate grid
    await this.props.createGrid(generateGrid(this.props.grid.size));
    // Build ships and place them on a board
    await this.buildShips();
  }

  render() {
    if (this.props.grid.gameStarted) {
      return (
        <div className={style.grid}>
          {this.props.grid.layout.map((row, rowIndex) => (
            <Row key={this.props.grid.idList[rowIndex]}>
              {row.map((cell, cellIndex) => (
                <Cell
                  onClick={() => this.makeTurn(cell, rowIndex, cellIndex)}
                  key={cell.id}
                  cell={cell}
                  ship={
                    this.props.grid.ships[cell.shipName] !== undefined
                      ? this.props.grid.ships[cell.shipName]
                      : null
                  }
                />
              ))}
            </Row>
          ))}
          {this.props.grid.totalRemaining === 0 ? (
            <Overlay>
              <FinalCaption playAgain={this.reset} />
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
    canTurn: PropTypes.bool,
    size: PropTypes.number,
    layout: PropTypes.array,
    idList: PropTypes.array,
    totalRemaining: PropTypes.number,
    ships: PropTypes.object,
  }),
  startGame: PropTypes.func,
  allowTurn: PropTypes.func,
  forbidTurn: PropTypes.func,
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
    allowTurn: () => dispatch(allowTurn()),
    forbidTurn: () => dispatch(forbidTurn()),
    createGrid: layout => dispatch(createGrid(layout)),
    createIDList: idList => dispatch(createIDList(idList)),
    placeShip: (shipCoords, occupiedCoords, shipLength, shipName, shipColor) =>
      dispatch(
        placeShip(shipCoords, occupiedCoords, shipLength, shipName, shipColor),
      ),
    checkCells: cells => dispatch(checkCells(cells)),
    damageShip: name => dispatch(damageShip(name)),
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
