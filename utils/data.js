import bcrypt from 'bcrypt';

export const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@email.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'admin',
  },
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
    firstName: 'Andre',
    lastName: 'S',
    email: 'andre@cutaboveshop.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'employee',
  },
  {
    firstName: 'Obi',
    lastName: 'M',
    email: 'obi@cutaboveshop.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'employee',
  },
  {
    firstName: 'Salah',
    lastName: 'R',
    email: 'salah@cutabove.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'employee',
  },
];

export const appointments = [
  {
    date: '2024-01-22',
    start: '17:00',
    end: '17:30',
  },
  {
    date: '2024-01-23',
    start: '14:00',
    end: '14:30',
  },
  {
    date: '2024-01-24',
    start: '10:00',
    end: '10:30',
  },
  {
    date: '2022-01-24',
    start: '13:00',
    end: '13:30',
  },
];
