/**
 * CODEVIVA Practical Lab Exercise
 * ID: c-pr-14
 * Category: Strings
 * Title: String Reversal in Place
 */

#include <stdio.h>
#include <string.h>

void reverseString(char str[]) {
    int left = 0;
    int right = strlen(str) - 1;

    while (left < right) {
        char temp = str[left];
        str[left] = str[right];
        str[right] = temp;
        left++;
        right--;
    }
}

int main() {
    char word[] = "CODEVIVA";
    printf("Original String: %s\\n", word);

    reverseString(word);

    printf("Reversed String: %s\\n", word);
    return 0;
}
