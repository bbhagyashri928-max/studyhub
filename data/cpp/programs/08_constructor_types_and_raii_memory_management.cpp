/**
 * CODEVIVA Practical Lab Exercise
 * ID: cpp-pr-8
 * Category: Constructors and Destructors
 * Title: Constructor Types and RAII Memory Management
 */

#include <iostream>

class Tracker {
private:
    int id;

public:
    Tracker() : id(0) {
        std::cout << "[Constructor] Default Tracker #0 created\\n";
    }

    Tracker(int id) : id(id) {
        std::cout << "[Constructor] Parameterized Tracker #" << id << " created\\n";
    }

    Tracker(const Tracker& other) : id(other.id + 100) {
        std::cout << "[Constructor] Copy of Tracker #" << other.id << " -> #" << id << "\\n";
    }

    ~Tracker() {
        std::cout << "[Destructor] Tracker #" << id << " destroyed\\n";
    }
};

int main() {
    std::cout << "--- Entering main block ---\\n";
    Tracker t1(1);
    Tracker t2 = t1; // Copy constructor
    {
        Tracker t3(3); // Scoped inside nested block
    } // t3 destroyed here
    std::cout << "--- Exiting main block ---\\n";
    return 0;
}
