/**
 * CODEVIVA Practical Lab Exercise
 * ID: cpp-pr-10
 * Category: Polymorphism
 * Title: Virtual Functions and Dynamic Method Dispatch
 */

#include <iostream>
#include <vector>

class Shape {
public:
    virtual double calculateArea() const = 0; // Pure virtual
    virtual void printName() const = 0;
    virtual ~Shape() {} // Essential virtual destructor
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double calculateArea() const override { return 3.14159 * radius * radius; }
    void printName() const override { std::cout << "Circle (r=" << radius << ")"; }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double calculateArea() const override { return w * h; }
    void printName() const override { std::cout << "Rectangle (" << w << "x" << h << ")"; }
};

int main() {
    std::vector<Shape*> shapes;
    shapes.push_back(new Circle(5.0));
    shapes.push_back(new Rectangle(4.0, 6.0));

    for (Shape* s : shapes) {
        s->printName();
        std::cout << " -> Area = " << s->calculateArea() << "\\n";
    }

    for (Shape* s : shapes) delete s;
    return 0;
}
