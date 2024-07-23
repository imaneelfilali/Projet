package com.dailycodework.springbootprojeect.service;

import com.dailycodework.springbootprojeect.model.student;

import java.util.List;

public interface IStudentservece {
    student addStudent(student student);
    List<student> getStudents();
    student updateStudent(student student,Long id);
    void deleteStudent(long id );
    student getStudentById(long id);
}
