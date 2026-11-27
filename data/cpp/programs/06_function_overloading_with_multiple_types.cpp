/**
 * CODEVERSE Practical Lab Exercise
 * ID: cpp-pr-6
 * Category: Functions
 * Title: Function Overloading with Multiple Types
 */

#include <iostream>

// Overload 1: Circle
double area(double radius) {
    const double PI = 3.14159;
    return PI * radius * radius;
}

// Overload 2: Rectangle
double area(double length, double width) {
    return length * width;
}

// Overload 3: Square
int area(int side) {
    return side * side;
}

int main() {
    std::cout << "Circle (r=4.0):        " << area(4.0) << std::endl;
    std::cout << "Rectangle (l=5.0,w=8.0): " << area(5.0, 8.0) << std::endl;
    std::cout << "Square (side=6):       " << area(6) << std::endl;
    return 0;
}
