import { getPrismaClient } from '../config/database.js';

const prisma = getPrismaClient();

export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    
    const parsedProjects = projects.map(p => {
      if (p.generatedFiles) {
        try { p.generatedFiles = JSON.parse(p.generatedFiles); } catch(e) {}
      }
      return p;
    });
    
    res.json(parsedProjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await prisma.project.findFirst({
      where: { id: req.params.id, userId: req.user.userId }
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    
    if (project.generatedFiles) {
      try { project.generatedFiles = JSON.parse(project.generatedFiles); } catch(e) {}
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, description, framework, language, repositoryUrl } = req.body;
    const project = await prisma.project.create({
      data: {
        name,
        description,
        framework,
        language,
        repositoryUrl,
        userId: req.user.userId
      }
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { name, description, framework, language, repositoryUrl, status } = req.body;
    const generatedFiles = req.body.generatedFiles || req.body.generated_files;
    
    // Convert generatedFiles array to string for SQLite if it's passed as an object/array
    let filesData = undefined;
    if (generatedFiles !== undefined) {
      filesData = typeof generatedFiles === 'string' ? generatedFiles : JSON.stringify(generatedFiles);
    }

    const project = await prisma.project.updateMany({
      where: { id: req.params.id, userId: req.user.userId },
      data: { 
        name, 
        description, 
        framework, 
        language, 
        repositoryUrl, 
        status,
        ...(filesData !== undefined && { generatedFiles: filesData })
      }
    });
    if (project.count === 0) return res.status(404).json({ error: 'Project not found' });
    const updated = await prisma.project.findUnique({ where: { id: req.params.id }});
    
    if (updated && updated.generatedFiles) {
      try {
        updated.generatedFiles = JSON.parse(updated.generatedFiles);
      } catch(e) {}
    }
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await prisma.project.deleteMany({
      where: { id: req.params.id, userId: req.user.userId }
    });
    if (project.count === 0) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
