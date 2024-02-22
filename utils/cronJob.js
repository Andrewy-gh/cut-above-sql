import cron from 'node-cron';
import { deleteExpiredTokens } from '../services/resetTokenService.js';

export default function cronJob() {
  cron.schedule('* * * * * *', async () => {
    const tokensFound = await deleteExpiredTokens();
    console.log('tokensFound: ', tokensFound);
  });
}
