package com.projecttools.service.implementation;

import com.projecttools.models.*;
import com.projecttools.repository.ResourceRepo;
import com.projecttools.repository.UserRepository;
import com.projecttools.request.NetworkRequest;
import com.projecttools.request.UserResourceRequest;
import com.projecttools.service.IUserService;
import com.projecttools.utils.Untis;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements IUserService {
    private final UserRepository _userRepo;
    private ResourceRepo resourceRepo;

    public UserService(UserRepository _userRepo, ResourceRepo resourceRepo) {
        this._userRepo = _userRepo;
        this.resourceRepo = resourceRepo;
    }

    @Override
    public User Login(String email, String password) {
        return _userRepo.findUserByEmailAndPassword(email, password).get();
    }

    @Override
    public User Register(String name, String email, String password, double budget) {
        User user = new User(name, email, password, budget, false, null, null, null, null);
        return _userRepo.save(user);
    }

    @Override
    public List<UserResources> GetUserResourcesAvailable(String email) {
        User user = _userRepo.findUserByEmail(email);
        return user.getResourcesAvailable() == null ? new ArrayList<>() : user.getResourcesAvailable();
    }

    @Override
    public User GetResourcesNeeded(String email) {
        User user = _userRepo.findUserByEmail(email);
        return _userRepo.findByIdWithresourcesNeeded(user.getId());
    }

    @Override
    public List<Network> GetNetworksAvailable(String email) {
        User user = _userRepo.findUserByEmail(email);
        return user.getNetworksAvailable() == null ? new ArrayList<>() : user.getNetworksAvailable();
    }

    @Override
    public List<Network> GetNetworksNeeded(String email) {
        User user = _userRepo.findUserByEmail(email);
        //User user1= _userRepo.findByIdWithnetworksNeeded(user.getId());
        return user.getNetworksNeeded() == null ? new ArrayList<>() : user.getNetworksNeeded();
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
    public User AddResourcesAvailable(List<UserResourceRequest> resourceAvailable) {
        User user = _userRepo.findUserByEmail(Untis.getUserName());
        if (user != null) {
            List<UserResources> resourcesAvailble = new ArrayList<>();
            resourceAvailable.forEach(userResourceRequest -> {
                Resource resource = resourceRepo.findById(userResourceRequest.getResourceId()).get();
                resourcesAvailble.add(UserResourceRequest.UserResourceRequestToResource(userResourceRequest, user, resource));

            });
            user.setResourcesAvailable(resourcesAvailble);
            _userRepo.save(user);
        }
        return null;
    }

    @Override
    public User AddResourcesNeeded(List<UserResourceRequest> resourcesNeeded) {
        User user = _userRepo.findUserByEmail(Untis.getUserName());
        if (user != null) {
            List<UserResources> resourcesNedded = new ArrayList<>();
            resourcesNeeded.forEach(userResourceRequest -> {
                Resource resource = resourceRepo.findById(userResourceRequest.getResourceId()).get();
                resourcesNedded.add(UserResourceRequest.UserResourceRequestToResource(userResourceRequest, user, resource));

            });
            user.setResourcesNeeded(resourcesNedded);
            _userRepo.save(user);
        }
        return null;
    }

    @Override
    public User AddNetworksNeeded(String email, List<NetworkRequest> networksNeeded) {
        User user = _userRepo.findUserByEmail(email);
        if (user != null) {
            user.setNetworksNeeded(NetworkRequest.networkRequestToNetwork(networksNeeded));
            _userRepo.save(user);
        }
        return null;
    }

    @Override
    public User AddNetworksAvailable(String email, List<NetworkRequest> networksAvailable) {
        User user = _userRepo.findUserByEmail(email);
        if (user != null) {
            user.setNetworksAvailable(NetworkRequest.networkRequestToNetwork(networksAvailable));
            _userRepo.save(user);
        }
        return null;
    }

}
