package com.projecttools.service;

import com.projecttools.models.Resource;

import java.util.List;
import java.util.UUID;

public interface IResourceService {
    public List<Resource> GetAllResources();
    public Resource GetResourceById(UUID id);
    public Resource AddResource(String name,String description,double cost,UUID categoryId);
    public Resource EditResource(UUID id,String name,String description,double cost,UUID categoryId);
    public void DeleteResource(UUID id);
}
