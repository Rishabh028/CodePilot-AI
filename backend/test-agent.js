import fetch from 'node-fetch';

async function testAgent() {
  try {
    console.log('Testing agent endpoint...');
    
    const response = await fetch('http://localhost:5000/api/agents/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agentType: 'requirements',
        input: 'Create a simple TODO app with user authentication',
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error response:', data);
      process.exit(1);
    }

    console.log('✅ Agent test successful!');
    console.log('Response:', JSON.stringify(data, null, 2));
    console.log('\nOutput preview (first 500 chars):');
    console.log(data.output.substring(0, 500) + '...');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testAgent();
