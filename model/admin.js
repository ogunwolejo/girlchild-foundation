// FUNCTION ORIENTED

const { PrismaClient, Prisma } = require("@prisma/client");

// modules
const { compare_hash_password } = require("../utils/hash_password");

const prisma = new PrismaClient();

// FUNCTION TO CREATE OR REGISTER A NEW ADMIN IN THE DATABASE
exports.create_admin = async (fullname, email, password) => {
  /**
   * only three users can be allocated the spot of an admin for security purposes
   * first we check the number od admins
   * if such number is equals to three then noone can register to be an admin again
   */
  try {
    const admin_count = await prisma.admin.count();

    if (admin_count < parseInt(process.env.TOTAL_NUM_ADMIN)) {
      const created_admin = await prisma.admin.create({
        data: {
          fullname: fullname,
          email: email,
          password: password,
        },
      });

      console.log(created_admin);
      return created_admin;
    }

    console.log(
      "Administrator spot has already been allocated, no new Adminstrator can be created!!"
    );
    return Promise.reject(
      "Administrator spot has already been allocated, no new Adminstrator can be created!!"
    );
  } catch (e) {
    return e;
  } finally {
    prisma.$disconnect();
  }
};

// FUNCTION FOR ADMINS TO LOGIN
exports.login_admin = async (email, password) => {
  try {
    const _admin = await prisma.admin.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
        fullname: true,
      },
    });

    // if there is no admin with such credentials then we throw an error
    if (!_admin) {
      console.log("There is no user with this credentials".toUpperCase());
      return Promise.reject(
        "There is no user with this credentials".toUpperCase()
      );
    }

    const check_password = compare_hash_password(_admin.password, password); // checking the password to ensure its correct with the one the user entered

    if (check_password) {
      return {
        fullname: _admin.fullname,
        email: _admin.email,
      };
    } else {
      console.log("Incorrect password");
      return Promise.reject("Incorrect password");
    }
  } catch (err) {
    return err;
  } finally {
    prisma.$disconnect();
  }
};

// FUNCTION FOR ADMINS TO CREATE THE PROFILE OF PEOPLE THAT NEED SOLUTIONS TO THEIR PROBLEMS
/**
 *
 * @param {fullname for profile of the problem} _fullname
 * @param {email for profile of the problem} _email
 * @param {phone contact for profile of the problem} _telephone
 * @param {person address} _address
 * @param {the problem the indivdual is facing} _doneeContent
 * @param {the amount the person is requesting for to solve their problem} _amountNeeded
 * @param { the person account number } _accountNum
 * @param {the name of the person bank } _bankName
 * @param { the picture of the person } image
 * @returns
 */
exports.create_problem_need_donation = async (
  _fullname,
  _email,
  _telephone,
  _address,
  _doneeContent,
  _amountNeeded,
  _accountNum,
  _bankName,
  _image
) => {
  try {
    await prisma.donee.create({
      data: {
        fullname: _fullname,
        email: _email,
        mobileNumber: _telephone,
        address: _address,
        content: _doneeContent,
        amount: new Prisma.Decimal(_amountNeeded),
        accountNumber: _accountNum,
        bank: _bankName,
        imageFile: { path: JSON.stringify(_image) },
      },
    });
    console.log("The Problem Profile was created");
    return Promise.resolve("The Problem Profile was created");
  } catch (e) {
    console.log("The Problem Profile was not created");
    return Promise.reject("The Problem Profile was not created");
  } finally {
    prisma.$disconnect();
  }
};
