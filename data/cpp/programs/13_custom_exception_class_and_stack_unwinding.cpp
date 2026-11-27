/**
 * CODEVERSE Practical Lab Exercise
 * ID: cpp-pr-13
 * Category: Exception Handling
 * Title: Custom Exception Class and Stack Unwinding
 */

#include <iostream>
#include <exception>
#include <string>

class InsufficientFundsException : public std::exception {
private:
    std::string msg;
public:
    InsufficientFundsException(double deficit) {
        msg = "Error: Insufficient balance. Short by $" + std::to_string(deficit);
    }
    const char* what() const noexcept override {
        return msg.c_str();
    }
};

void withdraw(double balance, double amount) {
    if (amount > balance) {
        throw InsufficientFundsException(amount - balance);
    }
    std::cout << "Withdrew $" << amount << ". Remaining: $" << (balance - amount) << "\\n";
}

int main() {
    try {
        withdraw(100.0, 50.0);
        withdraw(100.0, 250.0); // Will throw
    }
    catch (const InsufficientFundsException& e) {
        std::cerr << "Caught Custom Exception: " << e.what() << "\\n";
    }
    return 0;
}
