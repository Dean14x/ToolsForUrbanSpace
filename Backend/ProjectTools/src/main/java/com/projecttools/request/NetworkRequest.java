package com.projecttools.request;


import com.projecttools.models.Category;
import com.projecttools.models.Network;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class NetworkRequest {

    private String name;
    private String email;
    private double rating;
    private String contact;
    private String city;
    private String street;
    private CategoryRequest categoryRequest;


    public static List<Network> networkRequestToNetwork(List<NetworkRequest> networkRequests){
        return networkRequests.stream().map(networkRequest ->
                new Network(networkRequest.getName(),networkRequest.getEmail(),networkRequest.getRating(),networkRequest.getContact()
                ,networkRequest.getCity(),networkRequest.getStreet(),new Category(networkRequest.getCategoryRequest().getName()))
                ).collect(Collectors.toList());
    }


}
