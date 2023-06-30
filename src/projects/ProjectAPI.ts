import { Project } from "./Project";

const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/projects`;

function translateStatustoErrorMessage(status: number) {
    switch(status) {
        case 401:
            return "Please login again.";
        case 403:
            return "You do not have permission to view the projects.";
        default:
            return "Something went wrong. Please try again.";
    }
}

function checkStatus(response: any) {
    if (response.ok) {
        return response;
    } else {
        const httpError = {
            status: response.status,
            statusText: response.statusText,
            url: response.url
        };
        console.log(`httpError: ${JSON.stringify(httpError)}`);
        let errorMessage = translateStatustoErrorMessage(httpError.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response) { 
    return response.json();
}

function delay(ms: number) {
    return function(x: any): Promise<any> {
        return new Promise((resolve) => setTimeout(()=>resolve(x), ms));
    };
}

function convertToProjectModels(data: any[]): Project[] {
    let projects: Project[] = data.map(convertToProjectModel);
    return projects;
}

function convertToProjectModel(item: any): Project {
    return new Project(item);
}

const projectAPI = {
    get(page=1, limit=20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            .then(delay(600))
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToProjectModels)
            .catch((error: TypeError) => {
                console.log(error);
                throw new Error("There was a problem loading the projects.");
            });
    },
    put(project: Project) {
        return fetch (`${url}/${project.id}`, {
            method: "PUT",
            body: JSON.stringify(project),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
            console.log(error);
            throw new Error("There was a problem putting the projects.");
        });
    },
    find(id: number) {
        return fetch (`${url}/${id}`)
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToProjectModel);
    },
};

export {projectAPI};