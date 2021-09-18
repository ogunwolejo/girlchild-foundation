// HASHING PASSWORD AND COMPARING A HASHPASSWORD

const { genSaltSync, hashSync, compareSync } = require("bcryptjs");

const password_hash_salt = process.env.SALT_NUMBER;

// creating the salt for the password
const salt = genSaltSync(parseInt(password_hash_salt));

// function to hash a password
exports.password_to_be_hash = (password) => {
  return hashSync(password, salt);
};

// function to compare a hash_password and the plain text password
exports.compare_hash_password = (hash_password, plain_text_password) => {
  return compareSync(plain_text_password, hash_password);
};
