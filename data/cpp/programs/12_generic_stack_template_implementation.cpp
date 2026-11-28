/**
 * CODEVIVA Practical Lab Exercise
 * ID: cpp-pr-12
 * Category: Templates
 * Title: Generic Stack Template Implementation
 */

#include <iostream>
#include <vector>
#include <string>

template <typename T>
class CustomStack {
private:
    std::vector<T> elements;

public:
    void push(const T& item) {
        elements.push_back(item);
    }

    T pop() {
        if (elements.empty()) throw std::out_of_range("Stack is empty");
        T val = elements.back();
        elements.pop_back();
        return val;
    }

    T top() const {
        if (elements.empty()) throw std::out_of_range("Stack is empty");
        return elements.back();
    }

    bool isEmpty() const { return elements.empty(); }
};

int main() {
    // Integer Stack
    CustomStack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    std::cout << "Popped from intStack: " << intStack.pop() << "\\n";

    // String Stack
    CustomStack<std::string> strStack;
    strStack.push("CODEVIVA");
    strStack.push("Academy");
    std::cout << "Top of strStack: " << strStack.top() << "\\n";
    return 0;
}
