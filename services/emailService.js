import logger from '../utils/logger/index.js';
import { pub, sub } from '../utils/redis.js';
import { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD } from '../utils/config.js';
import options from '../utils/emailOptions.js';

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

export const publishMessage = async (obj) => {
  await pub.xadd('email-stream', 'MAXLEN', '3', '*', obj);
};

export const sendEmail = async ({
  receiver,
  employee,
  date,
  time,
  option,
  emailLink,
  contactDetails,
}) => {
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const senderReceiverOptions = {
    from: EMAIL_USER,
    to: receiver,
  };

  const emailTemplate = options(
    employee,
    date,
    time,
    option,
    emailLink,
    contactDetails
  );

  const fullEmailOptions = { ...senderReceiverOptions, ...emailTemplate };

  // Send Email
  try {
    const info = await transporter.sendMail(fullEmailOptions);
    logger.info({ info });
  } catch (err) {
    logger.error({ err });
  }
};
