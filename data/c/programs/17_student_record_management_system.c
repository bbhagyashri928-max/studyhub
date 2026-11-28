/**
 * CODEVIVA Practical Lab Exercise
 * ID: c-pr-17
 * Category: Structures and Unions
 * Title: Student Record Management System
 */

#include <stdio.h>

struct Student {
    int id;
    char name[30];
    float percentage;
};

int main() {
    struct Student batch[3] = {
        {101, "Lucas Vance", 88.5},
        {102, "Sophia Patel", 95.0},
        {103, "Ethan Cole", 91.2}
    };

    int topIndex = 0;
    printf("=== STUDENT DATABASE ===\\n");
    for (int i = 0; i < 3; i++) {
        printf("ID: %d | Name: %-14s | Score: %.1f%%\\n", 
               batch[i].id, batch[i].name, batch[i].percentage);
        if (batch[i].percentage > batch[topIndex].percentage) {
            topIndex = i;
        }
    }

    printf("\\nTop Achiever: %s with %.1f%%!\\n", 
           batch[topIndex].name, batch[topIndex].percentage);
    return 0;
}
