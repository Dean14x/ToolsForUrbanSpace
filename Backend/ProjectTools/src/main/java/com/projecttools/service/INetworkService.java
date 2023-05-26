package com.projecttools.service;

import com.projecttools.models.Category;
import com.projecttools.models.Network;

import java.util.List;
import java.util.UUID;

public interface INetworkService {
    public List<Network> FindAllByCity(String city);
    public Network GetNetworkById(UUID id);
    public Network AddNetwork(String name, String email, double rating, String contact, String city, String street, UUID categoryId);
    public Network EditNetwork(UUID id,String name, String email, double rating, String contact, String city, String street, UUID categoryId);
}
