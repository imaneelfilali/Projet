package com.dailycodework.springbootprojeect.repository;

import com.dailycodework.springbootprojeect.model.student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<student, Long> {

    Optional<student> findByEmail(String email);
}
