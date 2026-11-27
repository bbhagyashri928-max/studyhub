/**
 * CODEVERSE Practical Lab Exercise
 * ID: other-pr-2
 * Category: Data Structures
 * Title: Binary Search Tree (BST) Inorder Search
 */

#include <stdio.h>
#include <stdlib.h>

struct BSTNode {
    int val;
    struct BSTNode *left, *right;
};

struct BSTNode* insertBST(struct BSTNode* root, int val) {
    if (root == NULL) {
        struct BSTNode* node = (struct BSTNode*)malloc(sizeof(struct BSTNode));
        node->val = val;
        node->left = node->right = NULL;
        return node;
    }
    if (val < root->val) root->left = insertBST(root->left, val);
    else root->right = insertBST(root->right, val);
    return root;
}

void inorderPrint(struct BSTNode* root) {
    if (root != NULL) {
        inorderPrint(root->left);
        printf("%d ", root->val);
        inorderPrint(root->right);
    }
}

int main() {
    struct BSTNode* tree = NULL;
    int items[] = {45, 12, 89, 7, 33, 56, 99};

    for (int i = 0; i < 7; i++) {
        tree = insertBST(tree, items[i]);
    }

    printf("BST Inorder Traversal (Ascending Sort):\\n");
    inorderPrint(tree);
    printf("\\n");
    return 0;
}
