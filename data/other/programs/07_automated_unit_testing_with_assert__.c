/**
 * CODEVERSE Practical Lab Exercise
 * ID: other-pr-7
 * Category: Software Engineering
 * Title: Automated Unit Testing with assert()
 */

#include <stdio.h>
#include <assert.h>

int maxInt(int a, int b) {
    return (a > b) ? a : b;
}

int absVal(int n) {
    return (n < 0) ? -n : n;
}

int main() {
    // Unit tests for maxInt
    assert(maxInt(5, 10) == 10);
    assert(maxInt(-3, -8) == -3);
    assert(maxInt(0, 0) == 0);

    // Unit tests for absVal
    assert(absVal(-42) == 42);
    assert(absVal(42) == 42);
    assert(absVal(0) == 0);

    printf(">> All 6 automated unit test assertions passed! [100%% Test Success]\\n");
    return 0;
}
