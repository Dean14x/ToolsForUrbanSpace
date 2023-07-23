package com.projecttools.service;

import com.projecttools.models.*;
import com.projecttools.request.UserResourceRequest;

import java.util.List;
import java.util.UUID;

public interface IUserService {
    public User Login(String email,String password);
    public User Register(String name,String email,String password,double budget);
    public List<UserResources> getUserResourcesAvailable(String email);
    public List<UserResources> getResourcesNeeded(String email);
    public List<Network> GetNetworksAvailable(String email);
    public List<Network> GetNetworksNeeded(String email);
    public void DeleteUser(String email);
    public User EditUser(String name, String email, String password, double budget, boolean isAdmin, List<UserResources> resourceNeeded, List<UserResources> resourceAvailable, List<Network> networksNeeded,List<Network> networksAvailable);

    public User AddResourcesAvailable(List<UserResourceRequest> resourceAvailable);
    public User AddResourcesNeeded(List<UserResourceRequest> resourcesNeeded);

    public User AddNetworksNeeded(String email,UUID networksNeeded);
    public User AddNetworksAvailable(String email,UUID networksNeeded);

}
