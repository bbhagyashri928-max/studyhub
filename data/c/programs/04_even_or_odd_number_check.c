/**
 * CODEVIVA Practical Lab Exercise
 * ID: c-pr-4
 * Category: Conditional Statements
 * Title: Even or Odd Number Check
 */

#include <stdio.h>

int main() {
    int number = 47;

    if (number % 2 == 0) {
        printf("%d is an EVEN number.\\n", number);
    } else {
        printf("%d is an ODD number.\\n", number);
    }
    return 0;
}
