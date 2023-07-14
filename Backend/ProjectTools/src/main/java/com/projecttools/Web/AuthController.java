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
public class AuthController {

    private AuthService authService;
    public AuthController(AuthService authService){
        this.authService=authService;
    }
    @PostMapping("/login")
    @Operation(summary = "login user",description = "try to login")
    public String logIn(@RequestParam Map<String,String> authentication) {
       return authService.getToken(authentication);
    }

    @PostMapping("/regis")
    public void register(@RequestBody UserCredentials userCredentials){
        userCredentials.setAdmin(false);
        authService.registerUser(userCredentials);
    }

    @GetMapping("/getUser")
    public User getUSer(Authentication authentication) {
        return authService.getUser(authentication);
    }
}
