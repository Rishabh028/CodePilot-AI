#!/bin/bash

# Create backend directory structure
mkdir -p src/config
mkdir -p src/middleware
mkdir -p src/routes
mkdir -p src/controllers
mkdir -p src/services
mkdir -p src/utils

# Create config files
touch src/config/database.js
touch src/config/auth.js
touch src/config/env.js

# Create middleware files
touch src/middleware/auth.js
touch src/middleware/errorHandler.js
touch src/middleware/validation.js

# Create route files
touch src/routes/auth.js
touch src/routes/projects.js
touch src/routes/agents.js
touch src/routes/codeReview.js
touch src/routes/testing.js
touch src/routes/security.js
touch src/routes/deployments.js
touch src/routes/documentation.js
touch src/routes/billing.js

# Create controller files
touch src/controllers/authController.js
touch src/controllers/projectController.js
touch src/controllers/agentController.js
touch src/controllers/codeReviewController.js
touch src/controllers/testingController.js
touch src/controllers/securityController.js
touch src/controllers/deploymentController.js
touch src/controllers/billingController.js

# Create service files
touch src/services/aiService.js
touch src/services/claudeService.js
touch src/services/databaseService.js
touch src/services/emailService.js

# Create utility files
touch src/utils/logger.js
touch src/utils/helpers.js
touch src/utils/validators.js

# Create main entry point
touch src/index.js

echo "Backend directory structure created successfully!"
