{
  "name": "AgentRun",
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "description": "Associated project ID"
    },
    "agent_type": {
      "type": "string",
      "enum": [
        "requirements",
        "code_generator",
        "code_review",
        "security",
        "testing",
        "documentation",
        "deployment",
        "performance"
      ],
      "description": "Type of AI agent"
    },
    "status": {
      "type": "string",
      "enum": [
        "queued",
        "running",
        "completed",
        "failed"
      ],
      "default": "queued"
    },
    "input": {
      "type": "string",
      "description": "Input prompt or data"
    },
    "output": {
      "type": "string",
      "description": "Agent output"
    },
    "output_files": {
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
    "tokens_used": {
      "type": "number",
      "default": 0
    },
    "duration_ms": {
      "type": "number"
    },
    "error": {
      "type": "string"
    }
  },
  "required": [
    "agent_type"
  ]
}