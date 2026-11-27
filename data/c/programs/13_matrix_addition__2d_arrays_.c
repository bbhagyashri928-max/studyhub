/**
 * CODEVERSE Practical Lab Exercise
 * ID: c-pr-13
 * Category: Arrays
 * Title: Matrix Addition (2D Arrays)
 */

#include <stdio.h>

int main() {
    int A[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int B[2][3] = {{9, 8, 7}, {6, 5, 4}};
    int C[2][3];

    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            C[r][c] = A[r][c] + B[r][c];
        }
    }

    printf("Result of Matrix A + Matrix B:\\n");
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            printf("%4d", C[r][c]);
        }
        printf("\\n");
    }
    return 0;
}
