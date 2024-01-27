import Joi from 'joi';

export const schema = Joi.object({
  date: Joi.string().isoDate().required(),
  startTime: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  endTime: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  clientId: Joi.string().guid().required(),
  employeeId: Joi.string().guid().required(),
  service: Joi.string().required(),
});
