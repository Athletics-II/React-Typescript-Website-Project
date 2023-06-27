import { useState } from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";

function ProjectForm({project: initialProject, onSave, onCancel}) {
    const [project, setProject] = useState(initialProject);

    const [error, SetError] = useState({name : "", description : "", budget : ""});

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid()) return;
        onSave(project);
    };

    const handleChange = (event) => {
        const {type, name, value, checked} = event.target;
        let updatedValue = type === "checkbox" ? checked : value;

        if (type === "number") {
            updatedValue = Number(updatedValue);
        }
        const change = { [name]: updatedValue };

        let updatedProject;

        setProject((prevProject) => {
            updatedProject = new Project({ ...prevProject, ...change });
            return updatedProject;
        });
        SetError(() => validateForm(updatedProject));
    };

    function validateForm(project) {
        let error = { name : "", description : "", budget : "" };
        if (project.name.length < 3) {
            error.name = "Name must be at least 3 characters.";
        }
        return error;
    }

    function isValid() {
        return error.name.length === 0;
    }

    return(
    <form className="input-group vertical" onSubmit={handleSubmit}>
        <label htmlFor="name">Project Name</label>
        <input type="text" name="name" placeholder="enter name" 
        value={project.name} onChange={handleChange}/>
        {error.name.length > 0 && (<div className="card error">
            <p>{error.name}</p>    
        </div>
        )}

        <label htmlFor="description">Project Description</label>
        <textarea name="description" placeholder="enter description" 
        value={project.description} onChange={handleChange}/>

        <label htmlFor="budget">Project Budget</label>
        <input type="number" name="budget" placeholder="enter budget"
        value={project.budget} onChange={handleChange}/>

        <label htmlFor="isActive">Active?</label>
        <input type="checkbox" name="isActive"
        checked={project.isActive} onChange={handleChange}/>

        <div className="input-group">
            <button className="primary bordered medium">
                Save
            </button>
            <span />
            <button type="button" className="bordered medium"
                onClick={onCancel}>
                Cancel
            </button>
        </div>
    </form>
    );
}

ProjectForm.propTypes = {
    project: PropTypes.instanceOf(Project),
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default ProjectForm;