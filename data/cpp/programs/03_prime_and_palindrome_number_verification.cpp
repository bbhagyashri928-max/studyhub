/**
 * CODEVIVA Practical Lab Exercise
 * ID: cpp-pr-3
 * Category: Operators and Control Statements
 * Title: Prime and Palindrome Number Verification
 */

#include <iostream>

bool checkPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

bool checkPalindrome(int n) {
    int original = n, reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + (n % 10);
        n /= 10;
    }
    return original == reversed;
}

int main() {
    int pTest = 37;
    int palTest = 12321;

    std::cout << "Number " << pTest << " is Prime? " 
              << (checkPrime(pTest) ? "YES" : "NO") << std::endl;

    std::cout << "Number " << palTest << " is Palindrome? " 
              << (checkPalindrome(palTest) ? "YES" : "NO") << std::endl;
    return 0;
}
