import Client from 'Walletconnect/client';

// Replace 'YOUR_PROJECT_ID' with your actual project ID
const yourProjectId = '2f57decca6c2845fb4f4bcf8cbcf6d97';

// Initialize a new client with your project ID
const client = new Client({
  relayProvider: `wss://relay.walletconnect.org?projectId=${yourProjectId}`,
});

// Create a new session
const tes = async() =>{
    const session = await client.createSession({
        chainId: 1, // Ethereum mainnet
      });
}
tes()

// Listen for connection events
client.on('connect', (error, payload) => {
  if (error) {
    throw error;
  }

  // Handle connection payload
  console.log('Connected to WalletConnect!');
  console.log(payload);
});

// Listen for session update events
client.on('session_update', (error, payload) => {
  if (error) {
    throw error;
  }

  // Handle session update payload
  console.log('Session updated:');
  console.log(payload);
});

// Listen for disconnect events
client.on('disconnect', (error, payload) => {
  if (error) {
    throw error;
  }

  // Handle disconnect payload
  console.log('Disconnected from WalletConnect!');
  console.log(payload);
});

// Generate and display a QR code for the client to scan
console.log('Scan the QR code with your WalletConnect-enabled wallet:');
console.log(session.uri);


