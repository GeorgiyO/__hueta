package org.nekogochan.ticTacToe;

public class TTTModel {

    static class IllegalMoveException extends Exception {
        IllegalMoveException(int x, int y) {
            super("Illegal move on (" + x + ", " + y + ")");
        }
    }

    private int[][][] playerFields = new int[2][][];
    private char[][] gameField;
    private int step;
    private int p;
    private String winner;

    TTTModel() {
        refresh();
    }

    public String getWinner() {return winner;}

    public int getCurrentPlayer() {return p;}

    public char[][] getField() {return gameField;}

    public boolean doStep(int x, int y) throws IllegalMoveException {
        if (gameField[x][y] != ' ') throw new IllegalMoveException(x, y);

        changePlayer();
        gameField[x][y] = getPlayerMark();
        playerFields[p][x][y] = 1;

        if (checkField(playerFields[p])) {
            winner = String.valueOf(p);
            return true;
        } else return false;
    }

    public void refresh() {
        winner = "none";
        step = 0;
        p = 0;
        for (int i = 0; i < playerFields.length; i++) {
            playerFields[i] = new int[][] {
                    {0, 0, 0, 0, 0},
                    {0, 0, 0, 0, 0},
                    {0, 0, 0, 0, 0},
                    {0, 0, 0, 0, 0},
                    {0, 0, 0, 0, 0}
            };
        }
        gameField = new char[][] {
                {' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' '}
        };
    }

    private void changePlayer() {
        step++;
        p = step % 2;
    }

    private char getPlayerMark() {
        return p == 0 ? 'X' : 'O';
    }

    private boolean checkField(int[][] f) {
        // check horisontal
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 5; j++) {
                var sum = 0;
                for (var k = 0; k < 4; k++) {
                    sum += f[i + k][j];
                }
                if (sum == 4) return true;
            }
        }

        // check vertical
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 5; j++) {
                var sum = 0;
                for (var k = 0; k < 4; k++) {
                    sum += f[j][i + k];
                }
                if (sum == 4) return true;
            }
        }

        // check diagonal
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 2; j++) {
                if (leftToDownRightSum(f, i, j) == 4) return true;
            }
        }

        for (var i = 4; i >= 3; i--) {
            for (var j = 0; j < 2; j++) {
                if (rightToDownLeftSum(f, i, j) == 4) return true;
            }
        }

        return false;
    }

    private int leftToDownRightSum(int[][] f, int x, int y) {
        var sum = 0;
        for (var i = 0; i < 4; i++) {
            sum += f[x + i][y + i];
        }
        return sum;
    }

    private int rightToDownLeftSum(int[][] f, int x, int y) {
        var sum = 0;
        for (var i = 0; i < 4; i++) {
            sum += f[x - i][y + i];
        }
        return sum;
    }

}
