/**
 * CODEVERSE Practical Lab Exercise
 * ID: other-pr-3
 * Category: Systems & OS
 * Title: Process Creation with fork() and Exit Reaping
 */

#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    printf("[Main] Initial parent process PID: %d\\n", getpid());

    pid_t pid = fork();

    if (pid < 0) {
        perror("Fork failed");
        return 1;
    } else if (pid == 0) {
        // Child branch
        printf("[Child] Running child process (PID: %d, Parent PID: %d)\\n", getpid(), getppid());
        _exit(15); // Return exit code 15
    } else {
        // Parent branch
        int status;
        waitpid(pid, &status, 0);
        if (WIFEXITED(status)) {
            printf("[Parent] Child %d terminated with exit status: %d\\n", pid, WEXITSTATUS(status));
        }
    }
    return 0;
}
