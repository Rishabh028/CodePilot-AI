#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

const backendDir = path.join(__dirname, '..', 'backend');

function runCommand(cmd, cwd, description) {
  return new Promise((resolve) => {
    console.log(`\n🔧 ${description}...`);
    console.log(`   Command: ${cmd}`);
    console.log(`   Directory: ${cwd}\n`);

    exec(cmd, { cwd, maxBuffer: 10 * 1024 * 1024, shell: true }, (error, stdout, stderr) => {
      if (error) {
        console.log(`❌ ${description} FAILED`);
        console.log(`   Error: ${error.message}`);
        if (stderr) console.log(`   Stderr: ${stderr}`);
        resolve({ success: false, error: error.message });
      } else {
        console.log(`✅ ${description} COMPLETED`);
        if (stdout) console.log(`   ${stdout}`);
        resolve({ success: true });
      }
    });
  });
}

async function setupDatabase() {
  console.log('🚀 CodePilot Database Setup Starting...\n');

  // Step 1: Prisma Generate
  await runCommand(
    'npx prisma generate',
    backendDir,
    'Step 1: Generating Prisma Client'
  );

  // Step 2: Prisma DB Push
  await runCommand(
    'npx prisma db push --accept-data-loss',
    backendDir,
    'Step 2: Pushing Schema to Database'
  );

  console.log('\n✅ Database setup completed!');
  console.log('\n📝 Next steps:');
  console.log('   1. cd backend');
  console.log('   2. npm run dev');
}

setupDatabase().catch(console.error);
