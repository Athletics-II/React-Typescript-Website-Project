import React, { Fragment } from 'react';
import { MOCK_PROJECTS } from './MockProject';
import ProjectList from './ProjectList';

function ProjectsPage() {
    const saveProject = (project) => {
        console.log(project);
    };
    return (
        <Fragment>
            <h1>Projects</h1>
            <ProjectList onSave={saveProject} projects={MOCK_PROJECTS} />
        </Fragment>
    );
}

export default ProjectsPage;