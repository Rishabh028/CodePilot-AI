{
  "name": "Project",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Project name"
    },
    "description": {
      "type": "string",
      "description": "Project description"
    },
    "tech_stack": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Technologies used"
    },
    "framework": {
      "type": "string",
      "enum": [
        "nextjs",
        "react",
        "vue",
        "angular",
        "express",
        "nestjs",
        "django",
        "fastapi",
        "other"
      ],
      "description": "Primary framework"
    },
    "repository_url": {
      "type": "string",
      "description": "GitHub repository URL"
    },
    "status": {
      "type": "string",
      "enum": [
        "planning",
        "in_progress",
        "review",
        "testing",
        "deployed",
        "archived"
      ],
      "default": "planning"
    },
    "visibility": {
      "type": "string",
      "enum": [
        "private",
        "team",
        "public"
      ],
      "default": "private"
    },
    "requirements": {
      "type": "string",
      "description": "Natural language requirements"
    },
    "generated_files": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "path": {
            "type": "string"
          },
          "content": {
            "type": "string"
          },
          "language": {
            "type": "string"
          }
        }
      }
    },
    "agents_used": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "tokens_used": {
      "type": "number",
      "default": 0
    }
  },
  "required": [
    "name"
  ]
}