package com.projecttools.request;

import com.projecttools.models.Resource;
import com.projecttools.models.User;
import com.projecttools.models.UserResources;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
public class UserResourceRequest {

    int amount;
    boolean available;
    private UUID resourceId;

    public UserResourceRequest() {
    }

    public static UserResources UserResourceRequestToResource(UserResourceRequest userResourceRequest, User user, Resource resource) {
        return new UserResources(userResourceRequest.amount, userResourceRequest.available, user, resource);


    }
}
