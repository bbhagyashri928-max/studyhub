/**
 * CODEVERSE Practical Lab Exercise
 * ID: c-pr-9
 * Category: Loops
 * Title: Palindrome and Armstrong Number Check
 */

#include <stdio.h>

int main() {
    int num = 153;
    int temp = num, reversed = 0, armstrongSum = 0, remainder;

    while (temp > 0) {
        remainder = temp % 10;
        reversed = reversed * 10 + remainder;
        armstrongSum += remainder * remainder * remainder; // 3-digit cube
        temp /= 10;
    }

    printf("Original: %d | Reversed: %d\\n", num, reversed);
    printf("Is Palindrome? %s\\n", (num == reversed) ? "YES" : "NO");
    printf("Armstrong Sum: %d\\n", armstrongSum);
    printf("Is Armstrong Number? %s\\n", (num == armstrongSum) ? "YES" : "NO");
    return 0;
}
