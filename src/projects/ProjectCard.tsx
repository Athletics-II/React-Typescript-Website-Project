import { Project } from "./Project";
import PropTypes from "prop-types";
import React from "react";
import { Link } from 'react-router-dom';

function formatDescription(desc: string) {
    return desc.substring(0, 60) + "...";
}

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
}

function ProjectCard(props: ProjectCardProps) {
    const { project, onEdit } = props;
    const handleEditClick = (projectBeingEdited: Project) => {
        onEdit(projectBeingEdited);
    }
    return (
        <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section-dark">
                <Link to={'/projects/' + project.id}>
                <h5 className="strong">
                    <strong>{project.name}</strong>
                </h5>
                <p>{formatDescription(project.description)}</p>
                <p>Budget : {project.budget.toLocaleString()}</p>
                </Link>
                <button 
                    type = "button"
                    className="bordered"
                    onClick={() => {
                        handleEditClick(project);
                    }}>
                    <span className="icon-edit"></span>
                        Edit
                </button>
            </section>
        </div>
    );
}

ProjectCard.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired,
    onEdit: PropTypes.func.isRequired
};

export default ProjectCard;