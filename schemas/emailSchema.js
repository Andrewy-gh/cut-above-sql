const firstName = Joi.string().allow('');

const lastName = Joi.string().allow('');

const email = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'org', 'edu'] },
  })
  .required();

const message = Joi.string().allow('');

export const newMessageSchema = Joi.object({
  firstName,
  lastName,
  email,
  message,
});

export const passwordResetSchema = Joi.object({ email });
