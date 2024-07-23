package com.dailycodework.springbootprojeect.service;

import com.dailycodework.springbootprojeect.exception.StudentAlreadyExistsException;
import com.dailycodework.springbootprojeect.exception.StudentNotFoundException;
import com.dailycodework.springbootprojeect.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import com.dailycodework.springbootprojeect.model.student;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class StudentService implements IStudentservece{
    private final StudentRepository studentRepository;


    @Override
    public List<student> getStudents() {
        return studentRepository.findAll();
    }
    @Override
    public student addStudent(student student) {
        if(studentAlreadyExists(student.getEmail()))
            throw new StudentAlreadyExistsException(student.getEmail()+"already exists!");
        return studentRepository.save(student);
    }

    private boolean studentAlreadyExists(String email) {
        return studentRepository.findByEmail(email).isPresent() ;
    }

    @Override
    public student updateStudent(student student, Long id) {
        return studentRepository.findById(id).map(student1 -> {
            student1.setFirstName(student.getFirstName());
            student1.setLastName(student.getLastName());
            student1.setEmail(student.getEmail());
            student1.setDepartment(student.getDepartment());
            return studentRepository.save(student1);
        }).orElseThrow(()-> new StudentNotFoundException("Sorry,this student could not be found"));
    }

    @Override
    public void deleteStudent(long id) {
        if (!studentRepository.existsById(id)){
            throw new StudentAlreadyExistsException("Sorry, student  not  found");
        }
        studentRepository.deleteById(id);
    }


    @Override
    public student getStudentById(long id) {
        return studentRepository.findById(id).orElseThrow(()-> new StudentNotFoundException("Sorry, student not found"));
    }
}
