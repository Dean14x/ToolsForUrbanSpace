package com.projecttools.Web;

import com.projecttools.models.User;
import com.projecttools.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "*")
public class TestController {

    private UserRepository repository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public TestController(UserRepository repository) {
        this.repository = repository;
    }


    @GetMapping("/testData")
    public String test(){
        repository.save(new User("admin","admin",bCryptPasswordEncoder.encode("test"),0,true));
        return "test";
    }
}
