package com.projecttools.Web;

import com.projecttools.models.User;
import com.projecttools.request.UserCredentials;
import com.projecttools.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(maxAge = 3600)
public class AuthController {

    private AuthService authService;
    public AuthController(AuthService authService){
        this.authService=authService;
    }
    @PostMapping("/login")
    @Operation(summary = "login user",description = "try to login")
    public String logIn(@RequestBody Map<String,String> authentication) {
       return authService.getToken(authentication);
    }

    @PostMapping("/regis")
    @Operation(summary = "register user",description = "try to register")
    public void register(@RequestBody UserCredentials userCredentials){
        userCredentials.setAdmin(true);
        authService.registerUser(userCredentials);
    }

    @GetMapping("/getUser")
    public User getUSer(Authentication authentication) {
        return authService.getUser(authentication);
    }
}
