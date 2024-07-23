package com.dailycodework.springbootprojeect.controller;

import com.dailycodework.springbootprojeect.model.student;
import lombok.RequiredArgsConstructor;
import com.dailycodework.springbootprojeect.service.IStudentservece;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {
    private final IStudentservece studentservece ;
    @GetMapping
    public ResponseEntity<List<student>> getStudents(){
        return new ResponseEntity<>(studentservece.getStudents(), HttpStatus.FOUND);
    }
    @PostMapping
    public student AddStudent(@RequestBody student student){
        return studentservece.addStudent(student);

    }
    @PutMapping("/update/{id}")
    public student updateStudent(@RequestBody student student,@PathVariable long id){
        return studentservece.updateStudent(student,id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable Long id){
        studentservece.deleteStudent(id);
    }
    @GetMapping("/student/{id}")
    public student getStudentById(@PathVariable long id){
        return studentservece.getStudentById(id);

    }
}
