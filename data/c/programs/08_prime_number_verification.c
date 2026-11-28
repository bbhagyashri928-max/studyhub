/**
 * CODEVIVA Practical Lab Exercise
 * ID: c-pr-8
 * Category: Loops
 * Title: Prime Number Verification
 */

#include <stdio.h>
#include <stdbool.h>

int main() {
    int num = 29;
    bool isPrime = true;

    if (num <= 1) {
        isPrime = false;
    } else {
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                isPrime = false;
                break;
            }
        }
    }

    if (isPrime) {
        printf("%d is a PRIME number.\\n", num);
    } else {
        printf("%d is NOT a prime number.\\n", num);
    }
    return 0;
}
