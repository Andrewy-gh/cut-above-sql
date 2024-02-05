import Joi from 'joi';

export const bodySchema = Joi.object({
  date: Joi.string().isoDate().required(),
  // ! TODO: add custom validator to make sure end > start
  // ! Prev
  // start: Joi.string()
  //   .regex(/^\d{2}:\d{2}$/)
  //   .required(),
  // end: Joi.string()
  //   .regex(/^\d{2}:\d{2}$/)
  //   .required(),

  // ! New
  start: Joi.string().isoDate().required(),
  end: Joi.string().isoDate().required(),
  employeeId: Joi.string().guid().required(),
  // ! TODO: add custom validator for service
  service: Joi.string()
    .valid(
      'Haircut',
      'Beard Trim',
      'Straight Razor Shave',
      'Cut and Shave Package',
      'The Full Package'
    )
    .required(),
});

export const paramsSchema = Joi.object({
  id: Joi.string().guid().required(),
});

export const statusSchema = Joi.object({
  status: Joi.string()
    .valid('scheduled', 'checked-in', 'completed', 'no show')
    .required(),
});
