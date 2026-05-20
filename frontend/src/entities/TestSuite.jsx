{
  "name": "TestSuite",
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "test_type": {
      "type": "string",
      "enum": [
        "unit",
        "integration",
        "e2e",
        "api"
      ],
      "default": "unit"
    },
    "framework": {
      "type": "string",
      "enum": [
        "vitest",
        "jest",
        "playwright",
        "supertest"
      ],
      "default": "vitest"
    },
    "code": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "generated",
        "running",
        "passed",
        "failed"
      ],
      "default": "generated"
    },
    "coverage_percent": {
      "type": "number"
    },
    "tests_passed": {
      "type": "number",
      "default": 0
    },
    "tests_failed": {
      "type": "number",
      "default": 0
    },
    "tests_total": {
      "type": "number",
      "default": 0
    }
  },
  "required": [
    "name"
  ]
}