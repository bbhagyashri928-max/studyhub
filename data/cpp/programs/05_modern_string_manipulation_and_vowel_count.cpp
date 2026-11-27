/**
 * CODEVERSE Practical Lab Exercise
 * ID: cpp-pr-5
 * Category: Arrays and Strings
 * Title: Modern String Manipulation and Vowel Count
 */

#include <iostream>
#include <string>
#include <cctype>

int main() {
    std::string text = "Codeverse Academy C++ Masterclass";
    int vowels = 0;

    for (char c : text) {
        char lower = std::tolower(c);
        if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u') {
            vowels++;
        }
    }

    std::cout << "Input String: \\"" << text << "\\"" << std::endl;
    std::cout << "Length:       " << text.length() << " characters" << std::endl;
    std::cout << "Total Vowels: " << vowels << std::endl;
    std::cout << "Substring:    " << text.substr(0, 9) << std::endl;
    return 0;
}
