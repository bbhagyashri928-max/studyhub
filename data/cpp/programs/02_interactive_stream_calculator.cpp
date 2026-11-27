/**
 * CODEVERSE Practical Lab Exercise
 * ID: cpp-pr-2
 * Category: Basic Programs
 * Title: Interactive Stream Calculator
 */

#include <iostream>

int main() {
    double a = 48.0;
    double b = 6.0;

    std::cout << "Operating on operands: " << a << " and " << b << std::endl;
    std::cout << "Addition:       " << (a + b) << std::endl;
    std::cout << "Subtraction:    " << (a - b) << std::endl;
    std::cout << "Multiplication: " << (a * b) << std::endl;
    if (b != 0) {
        std::cout << "Division:       " << (a / b) << std::endl;
    }
    return 0;
}
