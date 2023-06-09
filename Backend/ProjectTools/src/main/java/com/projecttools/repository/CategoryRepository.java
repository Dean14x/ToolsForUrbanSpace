package com.projecttools.repository;

import com.projecttools.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    public Optional<Category> findById(UUID id);
    public Category findByName(String name);

}
