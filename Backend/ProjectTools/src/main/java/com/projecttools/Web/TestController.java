package com.projecttools.Web;

import com.projecttools.exception.NotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {


    @GetMapping
    public String test(){
        if(true){
            throw  new NotFoundException("dsa");
        }

        return "test";
    }
}
