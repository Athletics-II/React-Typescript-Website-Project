import { Project } from "./Project";

const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/projects`;

function translateStatustoErrorMessage(status) {
    switch(status) {
        case 401:
            return "Please login again.";
        case 403:
            return "You do not have permission to view the projects.";
        default:
            return "Something went wrong. Please try again.";
    }
}

function checkStatus(response) {
    if (response.ok) {
        return response;
    } else {
        const httpError = {
            status: response.status,
            statusText: response.statusText,
            url: response.url
        };
        console.log(`httpError: ${JSON.stringify(httpError)}`);
        let errorMessage = translateStatustoErrorMessage(response.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response) { 
    return response.json();
}

function delay(ms) {
    return function(x) {
        return new Promise((resolve) => setTimeout(()=>resolve(x), ms));
    };
}

const projectAPI = {
    get(page=1, limit=20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            .then(delay(600))
            .then(checkStatus)
            .then(parseJSON)
            .then((projects) => {
                return projects.map((p) => {
                    return new Project(p);
                });
            })
            .catch((error) => {
                console.log(error);
                throw new Error("There was a problem getting the projects.");
            });
    },
    put(project) {
        return fetch (`${url}/${project.id}`, {
            method: "PUT",
            body: JSON.stringify(project),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error) => {
            console.log(error);
            throw new Error("There was a problem getting the projects.");
        });
    },
};

export {projectAPI};