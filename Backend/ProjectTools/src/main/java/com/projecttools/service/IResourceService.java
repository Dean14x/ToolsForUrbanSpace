package com.projecttools.service;

import com.projecttools.models.Resource;

import java.util.List;
import java.util.UUID;

public interface IResourceService {
    public List<Resource> GetAllResources();
    public Resource GetResourceById(UUID id);
    public Resource AddResource(Resource resource);
    public Resource EditResource(UUID id);
    public Resource DeleteResource(UUID id);
}
