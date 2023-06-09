package com.projecttools.service;


import com.projecttools.models.Category;
import com.projecttools.models.Network;
import com.projecttools.models.Resource;
import com.projecttools.repository.CategoryRepo;
import com.projecttools.repository.NetworkRepository;
import com.projecttools.repository.ResourceRepository;
import com.projecttools.request.CategoryRequest;
import com.projecttools.request.NetworkRequest;
import com.projecttools.request.ResourceRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {


    private ResourceRepository resourceRepository;
    private CategoryRepo categoryRepo;
    private  NetworkRepository _networkRepo;

    public AdminService(ResourceRepository resourceRepository, CategoryRepo categoryRepo,NetworkRepository _networkRepo) {
        this.resourceRepository = resourceRepository;
        this.categoryRepo = categoryRepo;
        this._networkRepo=_networkRepo;
    }

    public void addResource(List<ResourceRequest> resource) {
          List<Resource> resources= findOrCreateCategoryResource(ResourceRequest.resourceRequestToResource(resource));
          resourceRepository.saveAll(resources);
    }

    private List<Resource> findOrCreateCategoryResource(List<Resource>  resources){
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

    public void addNetworks(List<NetworkRequest> networkRequest) {
        _networkRepo.saveAll(findOrCreateCategoryNetwork(NetworkRequest.networkRequestToNetwork(networkRequest)));
    }
    private List<Network> findOrCreateCategoryNetwork(List<Network>  resources){
        return resources.stream().map(network -> {
            Optional<Category> existedCategory= categoryRepo.findByName(network.getCategory().getName());
            if(!existedCategory.isPresent()){
                Category category=  categoryRepo.save(new Category(network.getCategory().getName()));
                network.setCategory(category);
            }else {
                network.setCategory(existedCategory.get());
            }
            return network;
        }).collect(Collectors.toList());
    }
}
