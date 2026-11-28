/**
 * CODEVIVA Practical Lab Exercise
 * ID: c-pr-5
 * Category: Conditional Statements
 * Title: Largest of Three Numbers
 */

#include <stdio.h>

int main() {
    int a = 64, b = 89, c = 32;

    printf("Numbers given: a = %d, b = %d, c = %d\\n", a, b, c);

    if (a >= b && a >= c) {
        printf("The largest number is a = %d\\n", a);
    } else if (b >= a && b >= c) {
        printf("The largest number is b = %d\\n", b);
    } else {
        printf("The largest number is c = %d\\n", c);
    }
    return 0;
}
