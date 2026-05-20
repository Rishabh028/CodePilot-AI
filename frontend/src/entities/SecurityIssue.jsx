{
  "name": "SecurityIssue",
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "severity": {
      "type": "string",
      "enum": [
        "critical",
        "high",
        "medium",
        "low",
        "info"
      ],
      "default": "medium"
    },
    "category": {
      "type": "string",
      "enum": [
        "sql_injection",
        "xss",
        "csrf",
        "auth",
        "secrets",
        "dependencies",
        "configuration",
        "other"
      ]
    },
    "file_path": {
      "type": "string"
    },
    "line_number": {
      "type": "number"
    },
    "description": {
      "type": "string"
    },
    "recommendation": {
      "type": "string"
    },
    "auto_fix": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "open",
        "in_progress",
        "resolved",
        "dismissed"
      ],
      "default": "open"
    }
  },
  "required": [
    "title",
    "severity"
  ]
}