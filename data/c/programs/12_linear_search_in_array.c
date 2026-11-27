/**
 * CODEVERSE Practical Lab Exercise
 * ID: c-pr-12
 * Category: Arrays
 * Title: Linear Search in Array
 */

#include <stdio.h>

int linearSearch(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i; // Return matched index position
        }
    }
    return -1; // Target not found
}

int main() {
    int list[] = {45, 12, 89, 73, 23, 67};
    int size = sizeof(list) / sizeof(list[0]);
    int key = 73;

    int resultIndex = linearSearch(list, size, key);

    if (resultIndex != -1) {
        printf("Element %d discovered at index %d!\\n", key, resultIndex);
    } else {
        printf("Element %d is not present in array.\\n", key);
    }
    return 0;
}
