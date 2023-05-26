package com.projecttools.service;

import com.projecttools.models.Network;

import java.util.List;
import java.util.UUID;

public interface INetworkService {
    public List<Network> FindAllByCity(String city);
    public Network GetNetworkById(UUID id);
    public Network AddNetwork(Network network);
    public Network EditNetwork(UUID id);
}
