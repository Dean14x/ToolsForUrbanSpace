package com.projecttools.Web;

import com.projecttools.models.*;
import com.projecttools.service.ICategoryService;
import com.projecttools.service.INetworkService;
import com.projecttools.service.IResourceService;
import com.projecttools.service.IUserService;
import com.projecttools.service.implementation.NetworkService;
import com.projecttools.service.implementation.ResourceService;
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

    public UserController(IUserService userService, INetworkService networkService, IResourceService resourceService,ICategoryService categoryService) {
        _userService = userService;
        _networkService=networkService;
        _resourceService=resourceService;
        this.categoryService=categoryService;
    }

    @PostMapping("/deleteUser")
    public void deleteUser(@RequestParam String email){
        _userService.DeleteUser(email);
    }

    @PostMapping("/edit")
    public User EditUser(@RequestParam UUID id,@RequestParam String name,@RequestParam String email,@RequestParam String password,@RequestParam double budget,@RequestParam boolean isAdmin,@RequestParam List<UserResources> resourceNeeded,@RequestParam List<UserResources> resourceAvailable,@RequestParam List<Network> networksNeeded,@RequestParam List<Network> networksAvailable){
        return this._userService.EditUser(id,name,email,password,budget,isAdmin,resourceNeeded,resourceAvailable,networksNeeded,networksAvailable);
    }

    @PostMapping("/addResourcesAvailable")
    public User addResourcesAvailable(@RequestParam UUID id,@RequestParam List<UserResources> resourcesAvailable){
        return this._userService.AddResourcesAvailable(id,resourcesAvailable);
    }
    @PostMapping("/addResourcesNeeded")
    public User addResourcesNeeded(@RequestParam UUID id,@RequestParam List<UserResources> resourcesNeeded){
        return this._userService.AddResourcesNeeded(id,resourcesNeeded);
    }
    @PostMapping("/addResourcesAvailable")
    public User addNetworksNeeded(@RequestParam UUID id,@RequestParam List<Network> networksNeeded){
        return this._userService.AddNetworksNeeded(id,networksNeeded);
    }
    @PostMapping("/addNetworksAvailable")
    public User addNetworksAvailable(@RequestParam UUID id,@RequestParam List<Network> networksAvailable){
        return this._userService.AddNetworksAvailable(id,networksAvailable);
    }

    /*@GetMapping("networke")
    public List<Network> getAllNetworke(){
        return _networkService.getAllNetworke();
    }

    @GetMapping("resource")
    public List<Resource> getAllResource(){
        return _resourceService.getAllresource();
    }

    @GetMapping("getcategorie")
    public List<Category> getAllCat(){
        return categoryService.getCategorie();
    }*/
}
