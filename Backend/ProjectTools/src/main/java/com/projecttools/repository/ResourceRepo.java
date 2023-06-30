package com.projecttools.repository;

import com.projecttools.models.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ResourceRepo extends JpaRepository<Resource, UUID> {
}
