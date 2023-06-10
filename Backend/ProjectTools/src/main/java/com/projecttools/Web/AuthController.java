package com.projecttools.Web;

import com.projecttools.request.UserCrediting;
import com.projecttools.service.AuthService;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.models.annotations.OpenAPI30;
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
    public void register(@RequestBody UserCrediting userCrediting){
        authService.registerUser(userCrediting);
    }
}
