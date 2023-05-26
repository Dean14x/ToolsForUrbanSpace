package com.projecttools.repository;

import com.projecttools.models.User;
import com.projecttools.models.UserResources;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    public User findUserByEmailAndPassword(String email,String password);//returns user with all list items !! bad pefrormance
    public User findUserById(UUID id);
    @Query("SELECT u FROM User u JOIN FETCH u.resourcesNeeded WHERE u.id = :user_id")
    public User findByIdWithresourcesNeeded(@Param("user_id") UUID user_id);
    @Query("SELECT u FROM User u JOIN FETCH u.resourcesAvailable WHERE u.id = :user_id")
    public User findByIdWithresourcesAvailable(@Param("user_id") UUID user_id);
    @Query("SELECT p FROM User p JOIN FETCH p.networksAvailable WHERE p.id = :user_id")
    public User findByIdWithnetworksAvailable(@Param("user_id") UUID user_id);
    @Query("SELECT u FROM User u JOIN FETCH u.networksNeeded WHERE u.id = :user_id")
    public User findByIdWithnetworksNeeded(@Param("user_id") UUID user_id);
}
