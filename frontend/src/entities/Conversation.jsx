{
  "name": "Conversation",
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string"
    },
    "title": {
      "type": "string"
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
        "performance",
        "general"
      ]
    },
    "messages": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string"
          },
          "content": {
            "type": "string"
          },
          "timestamp": {
            "type": "string"
          }
        }
      }
    }
  },
  "required": [
    "title"
  ]
}