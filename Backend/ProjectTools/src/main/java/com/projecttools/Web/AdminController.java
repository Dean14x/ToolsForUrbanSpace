package com.projecttools.Web;

import com.projecttools.models.Category;
import com.projecttools.request.CategoryRequest;
import com.projecttools.request.NetworkRequest;
import com.projecttools.request.ResourceRequest;
import com.projecttools.service.AdminService;
import com.projecttools.service.implementation.CategoryService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ROLE_admin')")
public class AdminController {

    private CategoryService categoryService;
    private AdminService adminService;

    public AdminController(CategoryService categoryService1,AdminService adminService) {
        categoryService = categoryService1;
        this.adminService =adminService;
    }

    @PostMapping("/addResource")
    public void addResource(@RequestBody List<ResourceRequest> resource) {
        adminService.addResource(resource);

    }

    @PostMapping("/addgategorie")
    public void addgategorie(@RequestBody List<CategoryRequest> categoryRequests) {
        adminService.addCategory(categoryRequests);
    }



    @PostMapping("/addNetwork")
    public void addNetworks(@RequestBody List<NetworkRequest> networkRequest){
        adminService.addNetworks(networkRequest);
    }

    @GetMapping
    public String test() {
        return "admin";
    }
}
