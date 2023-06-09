package com.projecttools.service;

import com.projecttools.models.Network;
import com.projecttools.models.User;
import com.projecttools.models.UserResources;

import java.util.List;
import java.util.UUID;

public interface IUserService {
    public User Login(String email,String password);
    public User Register(String name,String email,String password,double budget);
    public User GetUserResources(UUID id);
    public User GetResourcesNeeded(UUID id);
    public User GetNetworksAvailable(UUID id);
    public User GetNetworksNeeded(UUID id);
    public void DeleteUser(UUID id);
    public User EditUser(UUID id, String name, String email, String password, double budget, boolean isAdmin, List<UserResources> resourceNeeded, List<UserResources> resourceAvailable, List<Network> networksNeeded,List<Network> networksAvailable);

    public User AddResourcesAvailable(UUID id,List<UserResources> resourceAvailable);
    public User AddResourcesNeeded(UUID id,List<UserResources> resourcesNeeded);

    public User AddNetworksNeeded(UUID id,List<Network> networksNeeded);
    public User AddNetworksAvailable(UUID id,List<Network> networksAvailable);

}
