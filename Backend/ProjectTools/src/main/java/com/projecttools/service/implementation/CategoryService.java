package com.projecttools.service.implementation;

import com.projecttools.models.Category;
import com.projecttools.repository.CategoryRepository;
import com.projecttools.service.ICategoryService;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
public class CategoryService implements ICategoryService {
    private final CategoryRepository _categoryRepo;

    public CategoryService(CategoryRepository categoryRepo) {
        _categoryRepo = categoryRepo;
    }

    @Override
    public Category FindCategoryById(UUID id) {
        return _categoryRepo.findById(id).get();
    }

    @Override
    public Category FindCategoryByName(String name) {
        return _categoryRepo.findByName(name);
    }
}
