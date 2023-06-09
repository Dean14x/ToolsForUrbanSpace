package com.projecttools.repository;

import com.projecttools.models.Network;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface NetworkRepository extends JpaRepository<Network, UUID> {
    public List<Network> findAllByCityContaining(String city);
    public Optional<Network> findById(UUID id);
}
