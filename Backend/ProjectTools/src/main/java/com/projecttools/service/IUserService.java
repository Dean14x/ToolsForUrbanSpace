package com.projecttools.service;

import com.projecttools.models.*;

import java.util.List;
import java.util.UUID;

public interface IUserService {
    public User Login(String email,String password);
    public User Register(String name,String email,String password,double budget);
    public User GetUserResourcesAvailable(String email);
    public User GetResourcesNeeded(String email);
    public User GetNetworksAvailable(String email);
    public User GetNetworksNeeded(String email);
    public void DeleteUser(String email);
    public User EditUser(String name, String email, String password, double budget, boolean isAdmin, List<UserResources> resourceNeeded, List<UserResources> resourceAvailable, List<Network> networksNeeded,List<Network> networksAvailable);

    public User AddResourcesAvailable(String email,List<UserResources> resourceAvailable);
    public User AddResourcesNeeded(String email,List<UserResources> resourcesNeeded);

    public User AddNetworksNeeded(String email,List<Network> networksNeeded);
    public User AddNetworksAvailable(String email,List<Network> networksAvailable);

}
