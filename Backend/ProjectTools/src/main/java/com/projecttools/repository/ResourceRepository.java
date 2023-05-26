package com.projecttools.repository;

import com.projecttools.models.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface ResourceRepository extends JpaRepository<Resource, UUID> {
    public Optional<Resource> findById(UUID id);
    public List<Resource> findAll();
}
