package com.projecttools.Web;

import com.projecttools.models.*;
import com.projecttools.service.ICategoryService;
import com.projecttools.service.INetworkService;
import com.projecttools.service.IResourceService;
import com.projecttools.service.IUserService;
import com.projecttools.service.implementation.NetworkService;
import com.projecttools.service.implementation.ResourceService;
import com.projecttools.utils.Untis;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@PreAuthorize("hasRole('ROLE_user')")
public class UserController {

    private final IUserService _userService;
    private INetworkService _networkService;
    private IResourceService _resourceService;

    private ICategoryService categoryService;

    public UserController(IUserService userService, INetworkService networkService, IResourceService resourceService, ICategoryService categoryService) {
        _userService = userService;
        _networkService = networkService;
        _resourceService = resourceService;
        this.categoryService = categoryService;
    }

    @PostMapping("/deleteUser")
    public void deleteUser(){
        String email = Untis.getUserName();
        _userService.DeleteUser(email);
    }

    @PostMapping("/edit")
    public User EditUser(@RequestParam String name, @RequestParam String email, @RequestParam String password, @RequestParam double budget, @RequestParam boolean isAdmin, @RequestParam List<UserResources> resourceNeeded, @RequestParam List<UserResources> resourceAvailable, @RequestParam List<Network> networksNeeded, @RequestParam List<Network> networksAvailable) {
        return this._userService.EditUser(name, email, password, budget, isAdmin, resourceNeeded, resourceAvailable, networksNeeded, networksAvailable);
    }

    @PostMapping("/addResourcesAvailable")
    public User addResourcesAvailable(@RequestParam List<UserResources> resourcesAvailable) {
        String email = Untis.getUserName();
        return this._userService.AddResourcesAvailable(email,resourcesAvailable);
    }

    @PostMapping("/addResourcesNeeded")
    public User addResourcesNeeded(@RequestParam List<UserResources> resourcesNeeded) {
        String email = Untis.getUserName();
        return this._userService.AddResourcesNeeded(email, resourcesNeeded);
    }

    @PostMapping("/addNetworksNeeded")
    public User addNetworksNeeded(@RequestParam List<Network> networksNeeded) {
        String email = Untis.getUserName();
        return this._userService.AddNetworksNeeded(email, networksNeeded);
    }

    @PostMapping("/addNetworksAvailable")
    public User addNetworksAvailable(@RequestParam List<Network> networksAvailable) {
        String email = Untis.getUserName();
        return this._userService.AddNetworksAvailable(email, networksAvailable);
    }


    @GetMapping("networksAvailable")
    public List<Network> getUserNetworksAvailable(){
        String email = Untis.getUserName();
        return _userService.GetNetworksAvailable(email).getNetworksAvailable();
    }

    @GetMapping("networksNeeded")
    public List<Network> getUserNetworksNeeded(){
        String email = Untis.getUserName();
        return _userService.GetNetworksNeeded(email).getNetworksNeeded();
    }

    @GetMapping("resourceAvailable")
    public List<UserResources> getUserResourceAvailable(){
        String email = Untis.getUserName();
        return _userService.GetUserResourcesAvailable(email).getResourcesAvailable();
    }
    @GetMapping("resourceNeeded")
    public List<UserResources> getUserResourceNeeded(){
        String email = Untis.getUserName();
        return _userService.GetUserResourcesAvailable(email).getResourcesNeeded();
    }

}
