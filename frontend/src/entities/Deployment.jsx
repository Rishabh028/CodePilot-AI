
{
  "name": "Deployment",
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string"
    },
    "target": {
      "type": "string",
      "enum": [
        "vercel",
        "render",
        "railway",
        "docker",
        "kubernetes"
      ],
      "default": "vercel"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "building",
        "deploying",
        "live",
        "failed",
        "rolled_back"
      ],
      "default": "pending"
    },
    "url": {
      "type": "string"
    },
    "environment": {
      "type": "string",
      "enum": [
        "development",
        "staging",
        "production"
      ],
      "default": "production"
    },
    "build_log": {
      "type": "string"
    },
    "env_vars": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string"
          },
          "value": {
            "type": "string"
          }
        }
      }
    },
    "docker_config": {
      "type": "string"
    },
    "version": {
      "type": "string"
    }
  },
  "required": [
    "project_id",
    "target"
  ]
}