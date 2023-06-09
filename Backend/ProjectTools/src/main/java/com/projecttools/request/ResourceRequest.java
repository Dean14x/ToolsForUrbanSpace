package com.projecttools.request;

import com.projecttools.models.Category;
import com.projecttools.models.Resource;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
@Setter
@Component
public class ResourceRequest {

    private String name;
    private String description;
    private double cost;
    private CategoryRequest categoryRequest;


    public static List<Resource> resourceRequestToResource(List<ResourceRequest> resourceRequests) {
        return resourceRequests.stream().map((resourceRequest) -> {
                    return new Resource(resourceRequest.getName(), resourceRequest.getDescription(), resourceRequest.getCost()
                            , new Category(resourceRequest.getCategoryRequest().getName()));

                }
        ).collect(Collectors.toList());

    }
}
