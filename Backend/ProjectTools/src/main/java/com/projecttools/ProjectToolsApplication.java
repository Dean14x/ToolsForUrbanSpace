package com.projecttools;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication // uncomment when database is configured
//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })// to work without Databease
@EnableWebMvc// comment when database is configured

public class ProjectToolsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectToolsApplication.class, args);
    }

}
