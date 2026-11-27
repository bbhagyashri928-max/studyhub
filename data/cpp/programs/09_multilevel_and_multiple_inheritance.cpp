/**
 * CODEVERSE Practical Lab Exercise
 * ID: cpp-pr-9
 * Category: Inheritance
 * Title: Multilevel and Multiple Inheritance
 */

#include <iostream>
#include <string>

class Academic {
public:
    std::string institution = "CODEVERSE University";
};

class Researcher : virtual public Academic {
public:
    void publishPaper() const {
        std::cout << "Publishing research paper in IEEE journal.\\n";
    }
};

class Teacher : virtual public Academic {
public:
    void conductLecture() const {
        std::cout << "Delivering C++ Advanced Architecture lecture.\\n";
    }
};

// Multiple inheritance with virtual base to avoid diamond duplicates
class Professor : public Researcher, public Teacher {
private:
    std::string name;
public:
    Professor(std::string n) : name(n) {}
    void introduce() const {
        std::cout << "Professor: " << name << " at " << institution << "\\n";
    }
};

int main() {
    Professor prof("Dr. Elena Vance");
    prof.introduce();
    prof.conductLecture();
    prof.publishPaper();
    return 0;
}
