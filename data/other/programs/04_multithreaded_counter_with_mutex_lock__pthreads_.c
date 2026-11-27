/**
 * CODEVERSE Practical Lab Exercise
 * ID: other-pr-4
 * Category: Concurrency
 * Title: Multithreaded Counter with Mutex Lock (pthreads)
 */

#include <stdio.h>
#include <pthread.h>

#define TARGET_OPS 50000

int counter = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void* worker(void* arg) {
    for (int i = 0; i < TARGET_OPS; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

int main() {
    pthread_t t1, t2;

    printf("Starting 2 concurrent worker threads...\\n");
    pthread_create(&t1, NULL, worker, NULL);
    pthread_create(&t2, NULL, worker, NULL);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("Final Synchronized Counter: %d (Expected: %d)\\n", counter, 2 * TARGET_OPS);
    pthread_mutex_destroy(&lock);
    return 0;
}
