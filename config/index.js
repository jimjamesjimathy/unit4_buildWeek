module.exports = {
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8,
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'seecreeett',
    INSTRUCTOR_SECRET: process.env.INSTRUCTOR_SECRET || 'instructor_abc123',
    JWT_SECRET: process.env.JWT_SECRET || 'hello',
  }