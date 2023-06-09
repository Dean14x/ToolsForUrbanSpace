package com.projecttools.Web;

import com.projecttools.models.Network;
import com.projecttools.models.User;
import com.projecttools.models.UserResources;
import com.projecttools.service.IUserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@PreAuthorize("hasRole('ROLE_user')")
public class UserController {

    private final IUserService _userService;

    public UserController(IUserService userService) {
        _userService = userService;
    }

    @PostMapping("/deleteUser")
    public void deleteUser(@RequestParam UUID id){
        _userService.DeleteUser(id);
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

}
