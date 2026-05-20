#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectRoot = 'C:\\Users\\Rishabh\\OneDrive\\Desktop\\Coding\\CodePilot';
const frontendDir = path.join(projectRoot, 'frontend');
const backendDir = path.join(projectRoot, 'backend');

function runCommand(cmd, cwd, description) {
  return new Promise((resolve) => {
    console.log(`\n📦 ${description}...`);
    console.log(`   Command: ${cmd}`);
    console.log(`   Directory: ${cwd}\n`);

    exec(cmd, { cwd, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        console.log(`❌ ${description} FAILED`);
        console.log(`   Error: ${error.message}`);
        if (stderr) console.log(`   Stderr: ${stderr}`);
        resolve({ success: false, description, error: error.message });
      } else {
        console.log(`✅ ${description} COMPLETED`);
        if (stdout.length > 500) {
          console.log(`   Output (last 500 chars): ${stdout.slice(-500)}`);
        } else if (stdout) {
          console.log(`   ${stdout}`);
        }
        resolve({ success: true, description });
      }
    });
  });
}

async function runSetup() {
  console.log('🚀 CodePilot Project Setup Starting...\n');
  const results = [];

  // Task 1: Install Frontend
  results.push(await runCommand(
    'npm install',
    frontendDir,
    'Task 1: Installing Frontend Dependencies'
  ));

  // Task 2: Install Backend
  results.push(await runCommand(
    'npm install',
    backendDir,
    'Task 2: Installing Backend Dependencies'
  ));

  // Task 3: Generate Prisma Client
  results.push(await runCommand(
    'npx prisma generate',
    backendDir,
    'Task 3: Generating Prisma Client'
  ));

  // Task 4: Frontend Linting
  results.push(await runCommand(
    'npm run lint',
    frontendDir,
    'Task 4: Running Frontend Linting'
  ));

  // Task 5: Frontend Build
  results.push(await runCommand(
    'npm run build',
    frontendDir,
    'Task 5: Building Frontend for Production'
  ));

  // Summary Report
  console.log('\n' + '='.repeat(60));
  console.log('📋 SETUP SUMMARY REPORT');
  console.log('='.repeat(60) + '\n');

  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  results.forEach((result, index) => {
    const status = result.success ? '✅ PASS' : '❌ FAIL';
    console.log(`${index + 1}. ${result.description}: ${status}`);
  });

  console.log(`\nTotal: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(60) + '\n');

  if (failed === 0) {
    console.log('🎉 All setup tasks completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Start Backend:  cd backend && npm run dev');
    console.log('   2. Start Frontend: cd frontend && npm run dev');
    console.log('   3. Backend API:    http://localhost:5000');
    console.log('   4. Frontend:       http://localhost:5173 (or as shown in terminal)');
  } else {
    console.log('⚠️  Some tasks failed. Please review the errors above.');
  }
}

runSetup().catch(console.error);
