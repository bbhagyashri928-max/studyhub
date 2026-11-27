/**
 * CODEVERSE Practical Lab Exercise
 * ID: other-pr-6
 * Category: Secure Coding
 * Title: Buffer Overflow Defense with snprintf()
 */

#include <stdio.h>
#include <string.h>

int main() {
    char smallBuffer[16];
    char userInput[] = "This_is_a_very_long_input_payload_that_would_crash_unsafe_code";

    // Unsafe sprintf(smallBuffer, "%s", userInput); would corrupt stack memory!
    // Safe snprintf guarantees truncation to fit sizeof(smallBuffer):
    int written = snprintf(smallBuffer, sizeof(smallBuffer), "%s", userInput);

    printf("Truncated Buffer: \\"%s\\"\\n", smallBuffer);
    printf("Total Length Attempted: %d characters\\n", written);
    printf("Actual Stored (including '\\\\0'): %zu bytes\\n", sizeof(smallBuffer));
    return 0;
}
