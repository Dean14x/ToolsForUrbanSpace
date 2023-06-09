package com.projecttools.Web;

import com.projecttools.request.UserCrediting;
import com.projecttools.service.AuthService;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;
    public AuthController(AuthService authService){
        this.authService=authService;
    }
    @PostMapping("/login")
    public String logIn(@RequestParam Map<String,String> authentication) {
       return authService.getToken(authentication);
    }

    @PostMapping("/regis")
    public void register(@RequestBody UserCrediting userCrediting){
        authService.registerUser(userCrediting);
    }
}
