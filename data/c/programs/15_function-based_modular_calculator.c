/**
 * CODEVERSE Practical Lab Exercise
 * ID: c-pr-15
 * Category: Functions
 * Title: Function-Based Modular Calculator
 */

#include <stdio.h>

double add(double a, double b) { return a + b; }
double subtract(double a, double b) { return a - b; }
double multiply(double a, double b) { return a * b; }
double divide(double a, double b) { 
    if (b == 0) {
        printf("Error: Div by zero\\n");
        return 0;
    }
    return a / b; 
}

int main() {
    double x = 20.0, y = 4.0;
    printf("%.1f + %.1f = %.1f\\n", x, y, add(x, y));
    printf("%.1f - %.1f = %.1f\\n", x, y, subtract(x, y));
    printf("%.1f * %.1f = %.1f\\n", x, y, multiply(x, y));
    printf("%.1f / %.1f = %.1f\\n", x, y, divide(x, y));
    return 0;
}
