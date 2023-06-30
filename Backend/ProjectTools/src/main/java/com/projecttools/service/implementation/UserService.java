package com.projecttools.service.implementation;

import com.projecttools.models.*;
import com.projecttools.repository.UserRepository;
import com.projecttools.service.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class UserService implements IUserService {
    private final UserRepository _userRepo;
    public UserService(UserRepository _userRepo){
        this._userRepo = _userRepo;
    }
    @Override
    public User Login(String email, String password) {
        return _userRepo.findUserByEmailAndPassword(email,password).get();
    }

    @Override
    public User Register(String name, String email, String password, double budget) {
        User user = new User(name,email,password,budget,false,null,null,null,null);
        return _userRepo.save(user);
    }

    @Override
    public User GetUserResourcesAvailable(String email) {
        User user = _userRepo.findUserByEmail(email);
        return _userRepo.findByIdWithresourcesAvailable(user.getId());
    }

    @Override
    public User GetResourcesNeeded(String email) {
        User user = _userRepo.findUserByEmail(email);
        return _userRepo.findByIdWithresourcesNeeded(user.getId());
    }

    @Override
    public User GetNetworksAvailable(String email) {
        User user = _userRepo.findUserByEmail(email);
        return _userRepo.findByIdWithnetworksAvailable(user.getId());
    }

    @Override
    public User GetNetworksNeeded(String email) {
        User user = _userRepo.findUserByEmail(email);
        return _userRepo.findByIdWithnetworksNeeded(user.getId());
    }

    @Override
    public void DeleteUser(String email) {
        User user = _userRepo.findUserByEmail(email);
        _userRepo.delete(user);
    }

    @Override
    public User EditUser(String name, String email, String password, double budget, boolean isAdmin, List<UserResources> resourceNeeded, List<UserResources> resourceAvailable, List<Network> networksNeeded, List<Network> networksAvailable) {
        User user = _userRepo.findUserByEmail(email);
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setBudget(budget);
        user.set_Admin(isAdmin);
        user.setResourcesAvailable(resourceAvailable);
        user.setResourcesNeeded(resourceNeeded);
        user.setNetworksAvailable(networksAvailable);
        user.setNetworksNeeded(networksNeeded);
        return _userRepo.save(user);
    }

    @Override
    public User AddResourcesAvailable(String email, List<UserResources> resourceAvailable) {
        User user = _userRepo.findUserByEmail(email);
        if(user != null){
            user.setResourcesAvailable(resourceAvailable);
        }
        return null;
    }

    @Override
    public User AddResourcesNeeded(String email, List<UserResources> resourcesNeeded) {
        User user = _userRepo.findUserByEmail(email);
        if(user != null){
            user.setResourcesNeeded(resourcesNeeded);
        }
        return null;
    }

    @Override
    public User AddNetworksNeeded(String email, List<Network> networksNeeded) {
        User user = _userRepo.findUserByEmail(email);
        if(user != null){
            user.setNetworksNeeded(networksNeeded);
        }
        return null;
    }

    @Override
    public User AddNetworksAvailable(String email, List<Network> networksAvailable) {
        User user = _userRepo.findUserByEmail(email);
        if(user != null){
            user.setNetworksAvailable(networksAvailable);
        }
        return null;
    }

}
