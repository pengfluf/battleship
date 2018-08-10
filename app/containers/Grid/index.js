/**
 *
 * Grid
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Row from 'components/Row';
import Cell from 'components/Cell';
import Overlay from 'components/Overlay';
import FinalCaption from 'components/FinalCaption';
import StartPane from 'components/StartPane';
import InfoPane from 'components/InfoPane';

import generateGrid from 'helpers/generators/generateGrid';
import generateIDList from 'helpers/generators/generateIDList';
import buildShip from 'helpers/builders/buildShip';
import checkNearCells from 'helpers/checkers/checkNearCells';

import calcRandomUnchecked from 'helpers/calcs/calcRandomUnchecked';

import GridWrapper from './styled/GridWrapper';

import makeSelectGrid from './selectors';
import {
  startGame,
  allowTurn,
  forbidTurn,
  createGrid,
  createIDList,
  placeShip,
  checkCells,
  damageShip,
  userScored,
  computerScored,
  resetStats,
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

  turn(cell, rowIndex, cellIndex, whose) {
    if (cell.isShip) {
      const cells = checkNearCells(
        rowIndex,
        cellIndex,
        this.props.grid.layout,
        'collect',
      );
      this.props.checkCells(cells);
      this.props.damageShip(cell.shipName);
      if (whose === 'user') {
        this.props.userScored();
      } else {
        this.props.computerScored();
      }
    } else {
      this.props.checkCells([[rowIndex, cellIndex]]);
    }
  }

  computerTurn(cell, layout) {
    // The cell argument is users' choice which
    // was made before.

    // Forbid user to turn and let the computer make it.
    // User turn will be allowed after computers'
    // operations are done.
    this.props.forbidTurn();

    // If we damage the ship, computer can't make the
    // next turn, otherwise it obviously can.
    if (!cell.isShip) {
      const randomCellCoords = calcRandomUnchecked(layout);
      const [y, x] = [randomCellCoords[0], randomCellCoords[1]];
      const randomCell = layout[y][x];

      // Delay for human beings, computer is too fast
      const timerId = setInterval(() => {
        this.turn(randomCell, y, x, 'computer');
      }, 500);
      setTimeout(() => {
        clearInterval(timerId);
        this.props.allowTurn();
      }, 500);
    } else {
      this.props.allowTurn();
    }
  }

  makeTurn(cell, rowIndex, cellIndex) {
    if (this.props.grid.canTurn && !cell.checked) {
      const { layout } = this.props.grid;
      // Users' turn.
      this.turn(cell, rowIndex, cellIndex, 'user');
      // Computers' turn.
      this.computerTurn(cell, layout);
    }
  }

  async reset() {
    this.props.resetStats();

    await this.props.createIDList(generateIDList(this.props.grid.size));
    // Generate grid
    await this.props.createGrid(generateGrid(this.props.grid.size));
    // Build ships and place them on a board
    await this.buildShips();
  }

  render() {
    const {
      layout,
      idList,
      gameStarted,
      scores,
      canTurn,
      ships,
      totalRemaining,
    } = this.props.grid;
    if (gameStarted) {
      return (
        <Fragment>
          <InfoPane scores={scores} canTurn={canTurn} />
          <GridWrapper>
            {layout.map((row, rowIndex) => (
              <Row key={idList[rowIndex]}>
                {row.map((cell, cellIndex) => (
                  <Cell
                    onClick={() => this.makeTurn(cell, rowIndex, cellIndex)}
                    key={cell.id}
                    cell={cell}
                    ship={
                      ships[cell.shipName] !== undefined
                        ? ships[cell.shipName]
                        : null
                    }
                  />
                ))}
              </Row>
            ))}
            {totalRemaining === 0 ? (
              <Overlay>
                <FinalCaption
                  playAgain={this.reset}
                  scores={scores}
                  totalRemaining={totalRemaining}
                />
              </Overlay>
            ) : null}
          </GridWrapper>
        </Fragment>
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
    scores: PropTypes.object,
  }),
  startGame: PropTypes.func,
  allowTurn: PropTypes.func,
  forbidTurn: PropTypes.func,
  createGrid: PropTypes.func,
  createIDList: PropTypes.func,
  placeShip: PropTypes.func,
  checkCells: PropTypes.func,
  damageShip: PropTypes.func,
  userScored: PropTypes.func,
  computerScored: PropTypes.func,
  resetStats: PropTypes.func,
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
    userScored: () => dispatch(userScored()),
    computerScored: () => dispatch(computerScored()),
    resetStats: () => dispatch(resetStats()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid);
