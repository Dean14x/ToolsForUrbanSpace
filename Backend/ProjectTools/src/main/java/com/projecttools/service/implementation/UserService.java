package com.projecttools.service.implementation;

import com.projecttools.models.Network;
import com.projecttools.models.User;
import com.projecttools.models.UserResources;
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
    public User GetUserResources(UUID id) {
        return null;
    }

    @Override
    public User GetResourcesNeeded(UUID id) {
        return null;
    }

    @Override
    public User GetNetworksAvailable(UUID id) {
        return null;
    }

    @Override
    public User GetNetworksNeeded(UUID id) {
        return null;
    }

    @Override
    public void DeleteUser(UUID id) {
        User user = _userRepo.findUserById(id);
        _userRepo.delete(user);
    }

    @Override
    public User EditUser(UUID id, String name, String email, String password, double budget, boolean isAdmin, List<UserResources> resourceNeeded, List<UserResources> resourceAvailable, List<Network> networksNeeded, List<Network> networksAvailable) {
        User user = _userRepo.findUserById(id);
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
}
