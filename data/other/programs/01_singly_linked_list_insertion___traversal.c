/**
 * CODEVERSE Practical Lab Exercise
 * ID: other-pr-1
 * Category: Data Structures
 * Title: Singly Linked List Insertion & Traversal
 */

#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertAtHead(struct Node** headRef, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = *headRef;
    *headRef = newNode;
}

void printList(struct Node* node) {
    printf("List elements: ");
    while (node != NULL) {
        printf("[%d] -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* list = NULL;
    insertAtHead(&list, 40);
    insertAtHead(&list, 30);
    insertAtHead(&list, 20);
    insertAtHead(&list, 10);

    printList(list);

    // Free all allocated nodes
    struct Node* curr = list;
    while (curr != NULL) {
        struct Node* temp = curr;
        curr = curr->next;
        free(temp);
    }
    printf("Memory cleanly deallocated.\\n");
    return 0;
}
