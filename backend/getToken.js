import { createAuthTokens } from './src/config/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const tokens = createAuthTokens('cm0x999990000000000000000', 'test@test.com');
console.log(tokens.accessToken);
