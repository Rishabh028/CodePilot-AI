import fetch from 'node-fetch';

async function testAgents() {
  const testCases = [
    { agentType: 'requirements', input: 'Build a note-taking app' },
    { agentType: 'code_generator', input: 'E-commerce platform with Stripe integration' },
    { agentType: 'code_review', input: 'function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }' },
    { agentType: 'security', input: 'const query = "SELECT * FROM users WHERE id = " + userId;' },
    { agentType: 'testing', input: 'Login form with email and password fields' },
  ];

  console.log('🧪 Running comprehensive agent tests...\n');
  
  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    try {
      console.log(`⏳ Testing ${testCase.agentType} agent...`);
      
      const response = await fetch('http://localhost:5000/api/agents/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(`❌ ${testCase.agentType}: ${error.error}`);
        failed++;
        continue;
      }

      const data = await response.json();
      
      console.log(`✅ ${testCase.agentType} - Provider: ${data.provider}, Output length: ${data.output.length} chars`);
      passed++;
    } catch (error) {
      console.error(`❌ ${testCase.agentType} failed:`, error.message);
      failed++;
    }
    
    console.log('');
  }

  console.log(`\n📊 Test Summary: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

testAgents();
