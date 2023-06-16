package com.projecttools.service;


import com.projecttools.models.Category;
import com.projecttools.models.Network;
import com.projecttools.models.Resource;
import com.projecttools.repository.CategoryRepo;
import com.projecttools.repository.NetworkRepository;
import com.projecttools.repository.ResourceRepository;
import com.projecttools.repository.UserRepository;
import com.projecttools.request.CategoryRequest;
import com.projecttools.request.NetworkRequest;
import com.projecttools.request.ResourceRequest;
import com.projecttools.request.UserCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {


    private ResourceRepository resourceRepository;
    private CategoryRepo categoryRepo;
    private NetworkRepository _networkRepo;

    private UserRepository userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AdminService(ResourceRepository resourceRepository, CategoryRepo categoryRepo, NetworkRepository _networkRepo,
                        UserRepository userRepo) {
        this.resourceRepository = resourceRepository;
        this.categoryRepo = categoryRepo;
        this._networkRepo = _networkRepo;
        this.userRepo =userRepo;
    }

    public void addResource(List<ResourceRequest> resource) {
        List<Resource> resources = findOrCreateCategory(ResourceRequest.resourceRequestToResource(resource));
        resourceRepository.saveAll(resources);
    }


    public List<Category> addCategory(List<CategoryRequest> categoryRequests) {
        return categoryRepo.saveAll(CategoryRequest.categoryRequestToCategory(categoryRequests));
    }

    public void addNetworks(List<NetworkRequest> networkRequest) {
        _networkRepo.saveAll(findOrCreateCategory(NetworkRequest.networkRequestToNetwork(networkRequest)));
    }

    private <T> List<T> findOrCreateCategory(List<T> resources) {
        List<T> tList = new ArrayList<>();

        if (resources.get(0) instanceof Resource) {
            tList = ((List<Resource>) resources).stream().map(resource -> {
                Optional<Category> existedCategory = categoryRepo.findByName(resource.getCategory().getName());
                if (!existedCategory.isPresent()) {
                    Category category = categoryRepo.save(new Category(resource.getCategory().getName()));
                    resource.setCategory(category);
                } else {
                    resource.setCategory(existedCategory.get());
                }
                return ((T) resource);
            }).collect(Collectors.toList());
        } else {
            tList = ((List<Network>) resources).stream().map(network -> {
                Optional<Category> existedCategory = categoryRepo.findByName(network.getCategory().getName());
                if (!existedCategory.isPresent()) {
                    Category category = categoryRepo.save(new Category(network.getCategory().getName()));
                    network.setCategory(category);
                } else {
                    network.setCategory(existedCategory.get());
                }
                return ((T) network);
            }).collect(Collectors.toList());
        }
        return tList;
    }

    public void addAdmin(UserCredentials userCredentials) {
        userCredentials.setPassword(bCryptPasswordEncoder.encode( userCredentials.getPassword()));
        userRepo.save(UserCredentials.userCreditingToUser(userCredentials));
    }
}