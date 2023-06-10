package com.projecttools.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiDoc {

    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI()
                .info(info());

    }


    public Info info(){
        return new Info()
                .title("name")
                .description("Backend")
                .version("v1");
    }
}
