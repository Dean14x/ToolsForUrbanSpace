package com.projecttools.Web;

import com.projecttools.models.Category;
import com.projecttools.repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/home")
public class HomeController {

    @Autowired
    CategoryRepo categoryRepo;
   // /home/test

    @GetMapping(path = "/")
    public Category getHome(){
       Category category= categoryRepo.findByName("test").get();
        return category;
    }
}
