// THE DONATIONS CONTROLLER FOR PAYMENT MADE THROUGH PAYSTACK
const { PrismaClient } = require("@prisma/client");

const { create_donation } = require("../../model/donations");

const prisma = new PrismaClient();

exports.get_sum_of_donations_monthly = async (req, res) => {
  try {
    const groupBy = await prisma.donations.groupBy({
      by: ["createdAt"],
      orderBy: {
        createdAt: true,
      },
    });

    console.log(groupBy);
    return groupBy;
  } catch (e) {
    return e;
  } finally {
    prisma.$disconnect();
  }
};

/** DONATION MADE BY PAYING TO PAYSTACK GATEWAY */
exports.getPaymentPage = async (req, res) => {
  try {
    const ref = req.query.reference.toString();
    const cookie_payment_id = req.headers.cookie.split(";")[1].split("=")[1];
    console.log(ref, cookie_payment_id);

    const donation_created = await create_donation(ref, cookie_payment_id);

    console.log(donation_created);
    res.json({
      reference: ref,
      id: cookie_payment_id,
    });
  } catch (error) {
    res.status(400).error(error);
  }
};
