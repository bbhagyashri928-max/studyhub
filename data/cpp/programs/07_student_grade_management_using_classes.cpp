/**
 * CODEVERSE Practical Lab Exercise
 * ID: cpp-pr-7
 * Category: Classes and Objects
 * Title: Student Grade Management using Classes
 */

#include <iostream>
#include <string>
#include <vector>

class StudentRecord {
private:
    int id;
    std::string name;
    std::vector<int> scores;

public:
    StudentRecord(int id, std::string name, std::vector<int> s) 
        : id(id), name(name), scores(s) {}

    double calculateAverage() const {
        if (scores.empty()) return 0.0;
        double sum = 0;
        for (int s : scores) sum += s;
        return sum / scores.size();
    }

    char getGrade() const {
        double avg = calculateAverage();
        if (avg >= 90) return 'A';
        if (avg >= 80) return 'B';
        if (avg >= 70) return 'C';
        return 'D';
    }

    void displayCard() const {
        std::cout << "ID: " << id << " | Name: " << name 
                  << " | Avg: " << calculateAverage() 
                  << " | Grade: " << getGrade() << std::endl;
    }
};

int main() {
    StudentRecord s1(101, "Victoria Reed", {92, 88, 95});
    StudentRecord s2(102, "Brandon Scott", {78, 82, 75});

    std::cout << "=== STUDENT REPORT CARDS ===\\n";
    s1.displayCard();
    s2.displayCard();
    return 0;
}
