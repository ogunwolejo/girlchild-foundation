// THE FUNCTION THAT SHOWS, EDIT, PAGINATE THE DONEE(PROBLEMS PROFILE) IN THE DATABASE
//const {  } = require("crypto");
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

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
    let profile = await prisma.donee.create({
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
    //console.log("The Problem Profile was created", profile);
    return profile;
  } catch (e) {
    console.log("The Problem Profile was not created", e);
    return Promise.reject("The Problem Profile was not created");
  } finally {
    prisma.$disconnect();
  }
};

//FUNCTION TO UPDATE THE DATABASE THAT THIS PROFILE HAS BEEN SOLVED AND FUNDS HAVE BEEN PROVIDED FOR SUCH INDIVIDUAL
/**
 *
 * @param {the unqiue parameter} id
 */
exports.solved_problem_profile = async (id) => {
  // find the profile with the id , then we update the profile to completed
  try {
    let profile_id = await prisma.donee.update({
      where: {
        id: id,
      },
      data: {
        Solution_provide: true,
      },
    });

    if (!profile_id) {
      return Promise.reject("Profile does not exist");
    }

    return profile_id;
  } catch (err) {
    return err;
  } finally {
    prisma.$disconnect();
  }
};

// GET THE DONEE DATA
exports.get_donee_data = async (take_num, skip_num) => {
  let transformedDonnesData = [];
  try {
    const data = await prisma.donee.findMany({
      where: {
        Solution_provide: false,
      },
      take: take_num,
      skip: skip_num,
      orderBy: {
        fullname: "asc",
        //createdAt: "desc",
      },
    });

    data.forEach((e) => {
      transformedDonnesData.push({
        id: e.id,
        fullname: e.fullname,
        email: e.email,
        mobileNumber: e.mobileNumber,
        address: e.address,
        content: e.content,
        amount: new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(e.amount),
        category: e.category,
        accountNumber: e.accountNumber,
        bank: e.bank,
        imageFile: JSON.parse(e.imageFile.path),
      });
    });
    //console.log(transformedDonnesData);
    return transformedDonnesData;
  } catch (e) {
    console.log(e);
    return e;
  } finally {
    prisma.$disconnect();
  }
};

// GET A UNQUIE DONEE PROFILE USING ID
exports.get_unquie_donee_profile = async (id) => {
  try {
    const profile = await prisma.donee.findUnique({
      where: {
        id: id,
      },
    });

    if (!profile) {
      return Promise.reject("This user doesn't exist");
    }

    return profile;
  } catch (err) {
    return err;
  } finally {
    prisma.$disconnect();
  }
};

// GET RECENTLY CREATED DONEE PROFILE
exports.get_recently_created_donee_profile = async () => {
  let transformedDonnesData = [];
  try {
    const data = await prisma.donee.findMany({
      where: {
        Solution_provide: false,
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    data.forEach((e) => {
      transformedDonnesData.push({
        id: e.id,
        fullname: e.fullname,
        email: e.email,
        mobileNumber: e.mobileNumber,
        address: e.address,
        content: e.content,
        amount: new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(e.amount),
        category: e.category,
        accountNumber: e.accountNumber,
        bank: e.bank,
        imageFile: JSON.parse(e.imageFile.path),
      });
    });

    return transformedDonnesData;
  } catch (e) {
    console.log(e);
    return e;
  } finally {
    prisma.$disconnect();
  }
};

// FUNCTION FOR ADMINS TO SEARCH FOR A PROFILE BASED ON THE NAME OF THE PERSON IN THE PROILE
exports.search_donee_based_name = async (name, take_num, skip_num) => {
  try {
    const profile = prisma.donee.find({
      take: take_num,
      skip: skip_num,
      where: {
        fullname: name,
      },
    });

    if (!profile) {
      return Promise.reject("Profile is not in the database");
    }
    console.log(profile);
    return profile;
  } catch (e) {
    return e;
  } finally {
    prisma.$disconnect();
  }
};

// FUNCTION FOR ADMINS TO DELETE THE PROFILE OF PEOPLE THAT NEED SOLUTIONS TO THEIR PROBLEMS
/**
 *
 * @param {the id of the profile} id
 */
exports.delete_problem_need_donation = async (id) => {
  try {
    const profile = await prisma.donee.delete({
      where: {
        id: id,
      },
    });

    if (!profile) {
      return Promise.reject("This Problem Profile doesn't exisit");
    }

    return Promise.resolve("The Profile was deleted");
  } catch (err) {
    return err;
  } finally {
    prisma.$disconnect();
  }
};
