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
      console.log("Incorrect password".toUpperCase());
      return Promise.reject("Incorrect password".toUpperCase());
    }
  } catch (err) {
    return err;
  } finally {
    prisma.$disconnect();
  }
};
