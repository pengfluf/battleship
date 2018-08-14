## Useful terms
Initial cell – random valid cell, starting point of the ship construction. Use ```getInit(grid)```.

Ship body – only the straight part of the ship. For example, bodyLength of regular 4 cells ship is 4, but `LShaped` 4 cells ship has bodyLength equals to 3, because its last cell is curved. This is the **tail**.

Body direction – determines the building direction of the body. Use ```buildBody(initCell, bodyLength, grid).direction```.

Ship tail – curved part of the ship. Only `LShaped` ships have it. Tail length is always equals to 1. Use ```buildTail(lastCell, bodyDirection, grid)```.

Tail direction – yes, tail also has its bulding direction. The direction of the tail is always fixed ( because 'L' letter can't be mirrored) and depends on the direction of the built body. For example, if we were building ship body *up* from the initial cell, the tail direction will always be equal to *left*.

Last cell – the last cell of the building body. Being used for building a tail.

**Note**, that built ship has not only its own coordinates, but also the coordinates of the surrounding/**occupied cells**. Why? According to the rules of Battleship game ships must not touch each other and must have at least one cell between them. Use ```buildShip(grid, type).occupiedCoords``` or its modules – ```buildBody(initCell, bodyLength, grid).occupiedCoords``` and ```buildTail(lastCell, bodyDirection, grid).occupiedCoords```.
