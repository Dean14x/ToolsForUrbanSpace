package com.projecttools.request;


import com.projecttools.models.Category;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
public class CategoryRequest {

    private String name;

    public CategoryRequest(String name) {
        this.name=name;
    }
    public  CategoryRequest(){


    }


    public static Set<Category> categoryRequestToCategory(List<CategoryRequest> categoryRequests){
        return categoryRequests.stream().map(categoryRequest -> new Category(categoryRequest.getName())).collect(Collectors.toSet());
    }
}
