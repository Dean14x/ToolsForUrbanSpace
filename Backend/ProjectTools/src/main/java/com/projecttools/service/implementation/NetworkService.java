package com.projecttools.service.implementation;

import com.projecttools.models.Category;
import com.projecttools.models.Network;
import com.projecttools.repository.CategoryRepository;
import com.projecttools.repository.NetworkRepository;
import com.projecttools.service.INetworkService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class NetworkService implements INetworkService {
    private final NetworkRepository _networkRepo;
    private final CategoryRepository _categoryRepo;

    public NetworkService(NetworkRepository networkRepo, CategoryRepository categoryRepo) {
        _networkRepo = networkRepo;
        _categoryRepo = categoryRepo;
    }

    @Override
    public List<Network> FindAllByCity(String city) {
        return _networkRepo.findAllByCityContaining(city);
    }

    @Override
    public Network GetNetworkById(UUID id) {
        return _networkRepo.findById(id).get();
    }

    @Override
    public Network AddNetwork(String name, String email, double rating, String contact, String city, String street, UUID categoryId)
    {
        Category category = _categoryRepo.findById(categoryId).get();
        Network newNetwork = new Network(name,email,rating,contact,city,street,category);
        return _networkRepo.save(newNetwork);
    }

    @Override
    public Network EditNetwork(UUID id,String name, String email, double rating, String contact, String city, String street, UUID categoryId) {
        Network network = _networkRepo.findById(id).get();
        Category category = _categoryRepo.findById(categoryId).get();
        network.setName(name);
        network.setCity(city);
        network.setCategory(category);
        network.setEmail(email);
        network.setContact(contact);
        network.setRating(rating);
        network.setStreet(street);
        return _networkRepo.save(network);
    }
}
