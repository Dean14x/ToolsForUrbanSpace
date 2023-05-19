package com.projecttools;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

//@SpringBootApplication // uncomment when database is configured
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class }) // comment when database is configured
public class ProjectToolsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectToolsApplication.class, args);
    }

}
