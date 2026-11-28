/**
 * CODEVIVA Practical Lab Exercise
 * ID: cpp-pr-14
 * Category: STL Programs
 * Title: STL Vector Sorting, Maps, and Lambda Expressions
 */

#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
#include <string>

struct StudentRecord {
    std::string name;
    int score;
};

int main() {
    std::vector<StudentRecord> roster = {
        {"Alice", 85}, {"Bob", 92}, {"Charlie", 78}, {"Diana", 95}
    };

    // Sort descending using lambda predicate
    std::sort(roster.begin(), roster.end(), [](const StudentRecord& a, const StudentRecord& b) {
        return a.score > b.score;
    });

    std::cout << "=== RANKED LEADERBOARD ===\\n";
    for (size_t i = 0; i < roster.size(); i++) {
        std::cout << "#" << (i + 1) << " " << roster[i].name << " (" << roster[i].score << ")\\n";
    }

    // Associative Frequency Map
    std::map<char, int> gradeDistribution;
    for (const auto& s : roster) {
        char g = (s.score >= 90) ? 'A' : (s.score >= 80 ? 'B' : 'C');
        gradeDistribution[g]++;
    }

    std::cout << "\\nGrade Distribution:\\n";
    for (const auto& [grade, count] : gradeDistribution) {
        std::cout << "Grade " << grade << ": " << count << " student(s)\\n";
    }
    return 0;
}
