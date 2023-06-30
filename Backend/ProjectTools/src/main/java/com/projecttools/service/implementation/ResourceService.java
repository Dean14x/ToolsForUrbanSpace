package com.projecttools.service.implementation;

import com.projecttools.models.Category;
import com.projecttools.models.Resource;
import com.projecttools.repository.CategoryRepository;
import com.projecttools.repository.ResourceRepository;
import com.projecttools.service.IResourceService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class ResourceService implements IResourceService {
    private final ResourceRepository _resourceRepo;
    private final CategoryRepository _categoryRepo;

    public ResourceService(ResourceRepository resourceRepo, CategoryRepository categoryRepo) {
        _resourceRepo = resourceRepo;
        _categoryRepo = categoryRepo;
    }

    @Override
    public List<Resource> GetAllResources() {
        return _resourceRepo.findAll();
    }

    @Override
    public Resource GetResourceById(UUID id) {
        return _resourceRepo.findById(id).get();
    }

    @Override
    public Resource AddResource(String name, String description, double cost, UUID categoryId) {
        Category category = _categoryRepo.findById(categoryId).get();
        Resource newResource = new Resource(name,description,cost,category);
        return _resourceRepo.save(newResource);
    }


    @Override
    public Resource EditResource(UUID id,String name,String description,double cost,UUID categoryId) {
        Category category = _categoryRepo.findById(categoryId).get();
        Resource resource = _resourceRepo.findById(id).get();
        resource.setName(name);
        resource.setDescription(description);
        resource.setCategory(category);
        resource.setCost(cost);

        return _resourceRepo.save(resource);
    }

    @Override
    public void DeleteResource(UUID id) {
        Resource resource = _resourceRepo.findById(id).get();
        _resourceRepo.delete(resource);

    }
}
