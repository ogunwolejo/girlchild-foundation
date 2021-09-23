// THE FUNCTION THAT SHOWS, EDIT, PAGINATE THE DONEE(PROBLEMS PROFILE) IN THE DATABASE
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

exports.get_all_donations_made = async () => {
  try {
    const _d = await prisma.donations.findMany({
      include: {
        donatedTo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(_d);
    return _d;
  } catch (err) {
    return err;
  } finally {
    prisma.$disconnect();
  }
};

exports.create_donation = async (ref, donee_id) => {
  try {
    const create_donation_data = await prisma.donations.create({
      data: {
        reference: ref,
        doneeId: donee_id,
      },
    });

    if (!create_donation_data) {
      return Promise.reject(
        "Sorry, Donation has not been stored on The database".toUpperCase()
      );
    }

    return create_donation_data;
  } catch (err) {
    return err;
  } finally {
    prisma.$disconnect();
  }
};
