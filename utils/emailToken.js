// we hash the user id as a token that will be sent to the user email, using jsonwebtoken
const date = require("date-fns");

const { sign, decode, verify } = require("jsonwebtoken");

// creating the token that will be sent
exports.create_token = (id) => {
  // we make sure the token is only valid for 30mins
  const token = sign({ id: id }, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: 60 * 30, // expires in thirty minute
  });
  return token;
};

//decoding token
exports.decode_token = async (_token) => {
  // verify token first
  try {
    const decodedToken = await verify(_token, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
    });
    return decodedToken;
  } catch (error) {
    //console.log("token verification error", error);
    return error;
  }

  return decodedToken;
};
