/**
 * CODEVERSE Practical Lab Exercise
 * ID: c-pr-3
 * Category: Operators
 * Title: Compound Assignment and Bitwise Operations
 */

#include <stdio.h>

int main() {
    int val = 12; // Binary: 0000 1100
    int mask = 5; // Binary: 0000 0101

    printf("Initial val: %d\\n", val);
    val += 8; // val = val + 8
    printf("After val += 8: %d\\n", val);

    int bitAnd = 12 & 5; // 0000 0100 -> 4
    int bitOr = 12 | 5;  // 0000 1101 -> 13
    int bitShift = 3 << 2; // 3 * 2^2 = 12

    printf("Bitwise AND (12 & 5) = %d\\n", bitAnd);
    printf("Bitwise OR  (12 | 5) = %d\\n", bitOr);
    printf("Left Shift  (3 << 2) = %d\\n", bitShift);
    return 0;
}
