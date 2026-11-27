/**
 * CODEVERSE Practical Lab Exercise
 * ID: other-pr-5
 * Category: Systems & OS
 * Title: Inter-Process Communication via Anonymous Pipe
 */

#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main() {
    int pfd[2];
    char message[] = "IPC Data Stream from CODEVERSE";
    char buffer[128];

    if (pipe(pfd) == -1) {
        perror("Pipe failed");
        return 1;
    }

    // Write to pipe
    write(pfd[1], message, strlen(message) + 1);
    close(pfd[1]); // Close write end

    // Read from pipe
    read(pfd[0], buffer, sizeof(buffer));
    close(pfd[0]); // Close read end

    printf("Buffer received from pipe: \\"%s\\"\\n", buffer);
    return 0;
}
