import { sub } from '../utils/redis.js';

const processMessage = (message) => {
  console.log('Id: %s. Data: %O', message[0], message[1]);
};

export const listenForMessage = async (lastId = '$') => {
  // `results` is an array, each element of which corresponds to a key.
  // Because we only listen to one key (mystream) here, `results` only contains
  // a single element. See more: https://redis.io/commands/xread#return-value
  const results = await sub.xread(
    'BLOCK',
    0,
    'STREAMS',
    'email-stream',
    lastId
  );
  const [key, messages] = results[0]; // `key` equals to "user-stream"

  messages.forEach(processMessage);

  // Pass the last id of the results to the next round.
  await listenForMessage(messages[messages.length - 1][0]);
};
