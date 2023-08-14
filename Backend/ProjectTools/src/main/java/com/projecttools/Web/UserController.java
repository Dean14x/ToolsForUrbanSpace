package com.projecttools.Web;

import com.projecttools.models.*;
import com.projecttools.request.UserResourceRequest;
import com.projecttools.service.*;
import com.projecttools.utils.Untis;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@PreAuthorize("hasRole('ROLE_user')")
@CrossOrigin(origins = "*")
public class UserController {

    private final IUserService _userService;
    private INetworkService _networkService;
    private IResourceService _resourceService;

    private ICategoryService categoryService;

    private AdminService adminService;

    public UserController(IUserService userService, INetworkService networkService, IResourceService resourceService, ICategoryService categoryService,AdminService adminService) {
        _userService = userService;
        _networkService = networkService;
        _resourceService = resourceService;
        this.categoryService = categoryService;
        this.adminService=adminService;
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
    public User addResourcesAvailable(@RequestBody List<UserResourceRequest> resourcesAvailable) {
        return this._userService.AddResourcesAvailable(resourcesAvailable);
    }

    @PostMapping("/addResourcesNeeded")
    public User addResourcesNeeded(@RequestBody List<UserResourceRequest> resourcesNeeded) {
        return this._userService.AddResourcesNeeded(resourcesNeeded);
    }

    @PostMapping("/addNetworksNeeded")
    public User addNetworksNeeded(@RequestParam UUID networksNeededId) {
        String email = Untis.getUserName();
        return this._userService.AddNetworksNeeded(email, networksNeededId);
    }

    @PostMapping("/addNetworksAvailable")
    public User addNetworksAvailable(@RequestParam UUID networksNeededId) {
        String email = Untis.getUserName();
        return this._userService.AddNetworksAvailable(email, networksNeededId);
    }

    @GetMapping("/networksAvailable")
    public List<Network> getUserNetworksAvailable(){
        String email = Untis.getUserName();
        return _userService.GetNetworksAvailable(email);
    }

    @GetMapping("/networksNeeded")
    public List<Network> getUserNetworksNeeded(){
        String email = Untis.getUserName();
        return _userService.GetNetworksNeeded(email);
    }

    @GetMapping("/resourceAvailable")
    public List<UserResources> getUserResourceAvailable(){
        String email = Untis.getUserName();
        return _userService.getUserResourcesAvailable(email);
    }

    @GetMapping("/resourceNeeded")
    public List<UserResources> getUserResourceNeeded(){
        String email = Untis.getUserName();
        return _userService.getResourcesNeeded(email);
    }


    @GetMapping("/resource")
    @Operation(summary = "getAllResource ",description = "try to get All Resources")
    public List<Resource> getAllResource(){
        return adminService.getAllresource();
    }

    @GetMapping("networke")
    @Operation(summary = "getAllNetworke ",description = "try to get All Networks")
    public List<Network> getAllNetworke(){
        return adminService.getAllNetworke();
    }

}
