package com.projecttools.service;

import com.projecttools.models.Category;

import java.util.UUID;

public interface ICategoryService {
    public Category FindCategoryById(UUID id);
    public Category FindCategoryByName(String name);

}
