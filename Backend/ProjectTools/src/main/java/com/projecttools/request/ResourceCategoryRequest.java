package com.projecttools.request;

import com.projecttools.models.Category;
import com.projecttools.models.Resource;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class ResourceCategoryRequest {

    private List<ResourceRequest>resourceRequests;



}
