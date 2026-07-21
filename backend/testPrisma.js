import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const issue = await prisma.securityIssue.create({
      data: {
        title: "Test Issue",
        severity: "high",
        description: "This is a test description",
        code: null,
        remediation: "Test recommendation",
        status: "open",
        projectId: null,
        userId: "cmr6dmmel000010slyybwkxst",
        cveBucket: "test_category"
      }
    });
    console.log("Success:", issue);
  } catch (error) {
    console.error("Prisma error:", error);
  }
}

main();
