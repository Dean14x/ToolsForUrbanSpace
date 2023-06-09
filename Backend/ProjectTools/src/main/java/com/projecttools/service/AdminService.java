package com.projecttools.service;


import com.mysql.cj.xdevapi.Collection;
import com.projecttools.models.Category;
import com.projecttools.models.Resource;
import com.projecttools.repository.CategoryRepo;
import com.projecttools.repository.ResourceRepository;
import com.projecttools.request.CategoryRequest;
import com.projecttools.request.ResourceRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {


    private ResourceRepository resourceRepository;
    private CategoryRepo categoryRepo;

    public AdminService(ResourceRepository resourceRepository, CategoryRepo categoryRepo) {
        this.resourceRepository = resourceRepository;
        this.categoryRepo = categoryRepo;
    }

    public void addResource(List<ResourceRequest> resource) {
          List<Resource> resources=findOrCreateCategory(ResourceRequest.resourceRequestToResource(resource));
          resourceRepository.saveAll(resources);
    }

    private List<Resource> findOrCreateCategory(List<Resource>  resources){
        return resources.stream().map(resource -> {
            Optional<Category> existedCategory= categoryRepo.findByName(resource.getCategory().getName());
            if(!existedCategory.isPresent()){
             Category category=  categoryRepo.save(new Category(resource.getCategory().getName()));
             resource.setCategory(category);
            }else {
                resource.setCategory(existedCategory.get());
            }
        return resource;
        }).collect(Collectors.toList());
    }

    public List<Category> addCategory(List<CategoryRequest> categoryRequests) {
       return categoryRepo.saveAll(CategoryRequest.categoryRequestToCategory(categoryRequests));
    }
}
