const activateColMove = new Map();
const activateDiagonalMove = { count: 0 };
const activateRevDiagonalMove = { count: 0 };
const activateDrawRCMove = new Set();
const activateRowMove = new Map();
let winner = 'none';

const length = 3;
//determine the correct Column and Row
//determine the activeRow or activeColumn move
// function diagonalKey(x, y): string {
//     return `${x}${y}`;
// }

function diagonalUpdateMoves(xyObj: any, value: string, targetRC: string): void {
    console.log('Before', xyObj, xyObj.count, value);
    if (xyObj.count == 0) {
        xyObj.value = value;
        xyObj.count = 1;
    } else {
        if (xyObj.value == value) {
            xyObj.count += 1;
            console.log('After', xyObj.value, xyObj.count, value);
            winner = xyObj.count == 3 ? value : 'none';
        } else {
            activateDrawRCMove.add(targetRC);
            // console.log(
            //   "update of draw information from diagnal colunms",
            //   activateDrawRCMove
            // );
        }
    }
}
function isTheRowColAlreadyActive(xy: any, xyarray: any, value: any, targetRC: any): void {
    const isActive: boolean = xyarray.has(xy);
    const isDraw: boolean = activateDrawRCMove.has(targetRC);

    if (isActive == false && isDraw == false) {
        xyarray.set(xy, { moveId: value, count: 1 });
        console.log('Current map and its count value', value, xyarray.get(xy).count);
    } else {
        // console.log("Before Value of a count", xyarray.get(xy).count);
        if (isDraw == false) {
            if (xyarray.get(xy).moveId === value) {
                xyarray.get(xy).count += 1;
                winner = xyarray.get(xy).count == 3 ? value : 'none';
                console.log('Current map and its count value', value, xyarray.get(xy).count);
            } else {
                activateDrawRCMove.add(targetRC);
                xyarray.delete(xy);
            }
        } else {
            // console.log("Already in a draw state");
        }
    }
}
//if the rol/col is active, checkout if the earlier entry and current move belongs to same player or else call it draw
function lookForDrawRowCol(index: any, array: any, currentplayedValue: any): void {
    if (currentplayedValue == array.get(index)) {
    }
}

function updateRowColumnMove(rowX: any, colY: any, value: string): string {
    // console.log("Entered User Value", rowX, colY, rowX == colY);
    // prettier-ignore
    console.log('rowX,Coly', typeof rowX, typeof colY, rowX === colY , (rowX + colY) );
    switch (true) {
        // prettier-ignore
        case (rowX === colY && (parseInt(rowX) + parseInt(colY)) === length-1):
            console.log('case 1');
            diagonalUpdateMoves(activateDiagonalMove,value,"diagonal");
            diagonalUpdateMoves(activateRevDiagonalMove,value,'revDiagonal');
            //activateRowMove
            isTheRowColAlreadyActive(rowX, activateRowMove, value, `row${rowX}`);
            //activateColMove
            isTheRowColAlreadyActive(colY, activateColMove, value, `col${colY}`);
            break;
        case rowX === colY:
            console.log('case 2');
            //activateDiagonalMove

            // prettier-ignore
            diagonalUpdateMoves(activateDiagonalMove,value,"diagonal");
            //activateRowMove
            isTheRowColAlreadyActive(rowX, activateRowMove, value, `row${rowX}`);
            //activateColMove
            isTheRowColAlreadyActive(colY, activateColMove, value, `col${colY}`);
            break;
        case parseInt(rowX) + parseInt(colY) === length - 1:
            console.log('case 3');
            //activateReverseDiagonalMove
            // const target = 'revDiagonal';
            // prettier-ignore
            diagonalUpdateMoves(activateRevDiagonalMove,value,'revDiagonal');
            //activateRowMove
            isTheRowColAlreadyActive(rowX, activateRowMove, value, `row${rowX}`);
            //activateColMove
            isTheRowColAlreadyActive(colY, activateColMove, value, `col${colY}`);
            break;
        default:
            console.log('case default');
            //activateRowMove
            isTheRowColAlreadyActive(rowX, activateRowMove, value, `row${rowX}`);
            //activateColMove
            isTheRowColAlreadyActive(colY, activateColMove, value, `col${colY}`);
    }
    if (winner == 'none') {
        return activateDrawRCMove.size == 8 ? 'DRAW' : 'Done';
    } else {
        return winner;
    }
}

export default updateRowColumnMove;
