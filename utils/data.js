import bcrypt from 'bcrypt';

export const users = [
  {
    firstName: 'First',
    lastName: 'User',
    email: 'user1@email.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'client',
  },
  {
    firstName: 'Second',
    lastName: 'User',
    email: 'user2@email.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'client',
  },
  {
    firstName: 'Third',
    lastName: 'User',
    email: 'user3@email.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'client',
  },
  {
    firstName: 'Fourth',
    lastName: 'User',
    email: 'user4@email.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'client',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@email.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'employee',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@email.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'employee',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'janes@email.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'employee',
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'johns@email.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'employee',
  },
];

export const appointments = [
  {
    date: '2024-01-22',
    startTime: '17:00',
    endTime: '17:30',
  },
  {
    date: '2024-01-23',
    startTime: '14:00',
    endTime: '14:30',
  },
  {
    date: '2024-01-24',
    startTime: '10:00',
    endTime: '10:30',
  },
  {
    date: '2022-01-24',
    startTime: '13:00',
    endTime: '13:30',
  },
];
