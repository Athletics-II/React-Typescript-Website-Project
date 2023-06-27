import React from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

function ProjectList ({ projects }) {
    const handleEdit = (project) => {
        console.log(project);
    };

    const items = projects.map(project => (
        <div className="cols-sm" key={project.id}>
            <ProjectCard project={project} onEdit={handleEdit} />
            <ProjectForm />
        </div>
    ));
    return <div className="row">{items}</div>
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired
}

export default ProjectList;