/**
 * CODEVIVA Practical Lab Exercise
 * ID: cpp-pr-11
 * Category: Operator Overloading
 * Title: Matrix 2D Overloaded Arithmetic Operators
 */

#include <iostream>

class Vector2 {
public:
    double x, y;
    Vector2(double x = 0, double y = 0) : x(x), y(y) {}

    Vector2 operator+(const Vector2& rhs) const {
        return Vector2(x + rhs.x, y + rhs.y);
    }

    bool operator==(const Vector2& rhs) const {
        return x == rhs.x && y == rhs.y;
    }

    friend std::ostream& operator<<(std::ostream& os, const Vector2& v) {
        os << "(" << v.x << ", " << v.y << ")";
        return os;
    }
};

int main() {
    Vector2 a(2.5, 4.0);
    Vector2 b(1.5, 3.5);
    Vector2 c = a + b;

    std::cout << "a = " << a << "\\n";
    std::cout << "b = " << b << "\\n";
    std::cout << "a + b = " << c << "\\n";
    std::cout << "Are a and b equal? " << ((a == b) ? "YES" : "NO") << "\\n";
    return 0;
}
