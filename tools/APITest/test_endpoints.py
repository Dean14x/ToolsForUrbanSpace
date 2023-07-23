# quick script to test the endpoints of the API

import requests
import json
import random

# swagger = https://toolsforurbanspace.onrender.com/swagger-ui/index.html#/
ADDRESS = "http://toolsforurbanspace.onrender.com/"

class APIError(Exception):
    """
    Exception raised for errors in the API call.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message=None, status_code=None, response=None):
        self.message = message
        self.status_code = status_code
        self.response = response

    def __str__(self):
        s = "APIError"
        if self.message:
            s += "\n  Message: " + self.message
        if self.status_code:
            s += "\n  Status code: " + str(self.status_code)
        if self.response:
            s += "\n  Response: " + str(self.response)
        return s

def api_request(method, endpoint, data=None, params=None, form=None, headers=None):
    """
    Makes a request to the API and returns the response
    """
    if endpoint[0] == "/":
        endpoint = endpoint[1:]

    url = ADDRESS + endpoint
    response = requests.request(method, url, data=data, params=params, headers=headers, files=form)
    
    return response

def api_get(endpoint, params=None, headers=None):
    """
    Makes a GET request to the API and returns the response
    """
    return api_request("GET", endpoint, params=params, headers=headers)

def api_post(endpoint, data=None, form=None, params=None, headers=None):
    """
    Makes a POST request to the API and returns the response
    """
    return api_request("POST", endpoint, data=data, params=params, headers=headers, form=form)

def register_user(username, password, email):
    """
    Registers a user and returns the response
    """
    data = {
        "email": email,
        "password": password,
        "budget": 10000,
        "name": username,
    }
    headers = {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "CORS-Allowed-Origin": "*",
        "CORS-Allowed-Methods": "POST",
        "CORS-Allowed-Headers": "Content-Type, Accept, X-Requested-With, Origin, Authorization"

    }
    response = api_post("/auth/regis", data=data, headers=headers)
    
    if response.status_code != 200:
        raise APIError("Failed to register user", response.status_code, response)
    
    return response

def login_user(username, password):
    """
    Logs in a user and returns the response
    """
    data = {
        "username": username,
        "password": password
    }
    
    response = api_post("/auth/login", params=data)
    
    if response.status_code != 200:
        raise APIError("Failed to login user", response.status_code, response.json())
    
    return response


def main():
    """
    Main function
    """
    

    username = "Testuser" + str(random.randint(0, 100000))
    password = "Testpassword" + str(random.randint(0, 100000))
    email = "testemail" + str(random.randint(0, 100000)) + "@test.com"

    print("Logging in user admin...")
    response = login_user("admin@gmail.com", "admin")
    print("Admin logged in successfully")
    print("Response: " + str(response.text))

    print("Registering user " + username + "...")
    response = register_user(username, password, email)
    print("User registered successfully")
    print("Response: " + str(response.json()))

    


    



if __name__ == "__main__":
    try:
        main()
    except APIError as e:
        print(e)
    except Exception as e:
        print("Unknown error occurred")
        print(e)