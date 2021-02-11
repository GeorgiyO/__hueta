package _tmp;

import java.util.Arrays;

public class BattleField {

    static final int VALID_SUM_VALUE = 20;

    public static boolean fieldValidator(int[][] field) {
        if (Arrays.stream(field).flatMapToInt(Arrays::stream).sum() != VALID_SUM_VALUE) return false;

        BattleField bf = new BattleField(field);

        for (int x = 0; x < 10; x++)
            for (int y = 0; y < 10; y++)
                if (bf.isInvalidPoint(x, y))
                    return false;

        return bf.isShipsCountValid();
    }

    int[][] field;
    int[][] shipsCheckedPositions = new int[10][10];
    int[] shipsCount = {4, 3, 2, 1}; // shipsSize = i + 1;

    private BattleField(int[][] field) {
        this.field = field;
    }

    /* . . . . . . . .
     * . . . d . . . .
     * y . * s . . . .
     * . . s d . . . .
     * . . . . . . . .
     * . . x . . . . .
     *
     * s - checked points for gettings ships
     * d - for invalid checks
     *
     */
    public boolean isInvalidPoint(int x, int y) {
        if (field[x][y] == 0) return false;
        return diagonalInvalid(x, y) || shipInvalid(x, y);
    }

    public boolean diagonalInvalid(int x, int y) {
        if (x < 9) {
            if (y < 9) {
                if (field[x + 1][y + 1] == 1) return true;
            }
            if (y > 0) {
                if (field[x + 1][y - 1] == 1) return true;
            }
        }
        return false;
    }

    public boolean shipInvalid(int x, int y) {
        boolean ver = false;
        boolean hor = false;

        if (x < 9) hor = field[x + 1][y] == 1;
        if (y < 9) ver = field[x][y + 1] == 1;

        if (hor && ver) return true;

        if (shipsCheckedPositions[x][y] == 0) {
            int len = 0; // should be 1, 0 for index in array
            if (hor) {
                for (int _x = x + 1; _x < 10; _x++) {
                    if (field[_x][y] == 1) {
                        shipsCheckedPositions[_x][y] = 1;
                        len++;
                    } else break;
                }
            } else {
                for (int _y = y + 1; _y < 10; _y++) {
                    if (field[x][_y] == 1) {
                        shipsCheckedPositions[x][_y] = 1;
                        len++;
                    } else break;
                }
            }

            if (len > 3) return true;

            shipsCount[len]--;
        }

        return false;
    }

    public boolean isShipsCountValid() {
        for (int c : shipsCount) {
            if (c != 0) return false;
        }
        return true;
    }

}