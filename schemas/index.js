import Joi from 'joi';

export const bodySchema = Joi.object({
  date: Joi.string().isoDate().required(),
  // ! TODO: add custom validator to make sure end > start
  start: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  end: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  employeeId: Joi.string().guid().required(),
  // ! TODO: add custom validator for service
  service: Joi.string().required(),
});

export const paramsSchema = Joi.object({
  id: Joi.string().guid().required(),
});
