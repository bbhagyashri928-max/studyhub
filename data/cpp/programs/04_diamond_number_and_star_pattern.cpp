/**
 * CODEVERSE Practical Lab Exercise
 * ID: cpp-pr-4
 * Category: Patterns
 * Title: Diamond Number and Star Pattern
 */

#include <iostream>

int main() {
    int n = 4;

    std::cout << "Symmetrical Diamond Pattern (N = 4):\\n";
    // Upper half
    for (int i = 1; i <= n; i++) {
        for (int s = 1; s <= n - i; s++) std::cout << " ";
        for (int j = 1; j <= 2 * i - 1; j++) std::cout << "*";
        std::cout << "\\n";
    }
    // Lower half
    for (int i = n - 1; i >= 1; i--) {
        for (int s = 1; s <= n - i; s++) std::cout << " ";
        for (int j = 1; j <= 2 * i - 1; j++) std::cout << "*";
        std::cout << "\\n";
    }
    return 0;
}
