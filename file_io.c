#include <stdio.h>
#include <stdlib.h>

// Function to read and display file contents
void readFile(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        printf("Error: Could not open %s\n", filename);
        return;
    }

    printf("Contents of %s:\n", filename);
    char ch;
    while ((ch = fgetc(file)) != EOF) {
        putchar(ch);
    }
    printf("\n----------------------\n");

    fclose(file);
}

int main() {
    // Define file names
    const char *file1 = "file1.txt";
    const char *file2 = "file2.txt";
    const char *file3 = "file3.txt";
    const char *file4 = "file4.txt";

    // Read and display contents of each file
    readFile(file1);
    readFile(file2);
    readFile(file3);

    return 0;
}

