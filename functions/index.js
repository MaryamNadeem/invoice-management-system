/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

exports.saveCustomer = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const customer = req.body.customer;
    if (customer.name) {
      const writeResult = await admin
        .firestore()
        .collection("Customer")
        .add(customer);
      res.json({
        success: true,
        result: `Customer saved successfully with id ${writeResult.id}`,
      });
    } else {
      res.json({
        success: false,
        result: "Please provide a customer name",
      });
    }
  });
});

exports.getCustomers = onRequest(async (req, res) => {
  cors(req, res, async () => {
    let orderByField = req.query?.orderBy || "";
    let orderDesc =
      req.query?.orderDesc && req.query.orderDesc === "true" ? true : false;
    let pageNumber = req.query?.pageNumber
      ? Number.parseInt(req.query.pageNumber)
      : 1;
    let pageSize = req.query?.pageSize
      ? Number.parseInt(req.query.pageSize)
      : 10;

    if (pageNumber <= 0) pageNumber = 1;
    if (pageSize <= 0 || pageSize >= 100) pageSize = 10;

    switch (orderByField) {
      case "createdAt":
        break;
      case "currentBalance":
        break;
      case "name":
        break;
      default:
        orderByField = "createdAt";
        break;
    }

    const customerCollection = admin.firestore().collection("Customer");

    let query = orderDesc
      ? customerCollection.orderBy(orderByField, "desc")
      : customerCollection.orderBy(orderByField);

    const list = await (
      await query
        // .startAfter((pageNumber - 1) * pageSize)
        .limit(50)
        .get()
    ).docs;

    const count = await query.count().get().data().count;

    const customers = list.map((item) => {
      return {
        name: item.get("name"),
        address: item.get("address"),
        contactPerson: item.get("contactPerson"),
        phoneNumber: item.get("phoneNumber"),
        mobileNumber: item.get("mobileNumber"),
        email: item.get("email"),
        fax: item.get("fax"),
        salesTaxNumber: item.get("salesTaxNumber"),
        ntn: item.get("ntn"),
        openingBalanceAmount: item.get("openingBalanceAmount"),
        openingBalanceDate: item.get("openingBalanceDate"),
        currentBalance: item.get("currentBalance"),
        createdAt: item.get("createdAt"),
      };
    });

    const pagination = getPageDetails(pageNumber, pageSize, count);
    res.json({ customers, pagination });
  });
});

const getPageDetails = (pageNumber, pageSize, count) => {
  const totalPages = Math.ceil(count / pageSize);
  return {
    pageNumber: pageNumber,
    pageSize: pageSize,
    totalCount: count,
    totalPages: totalPages,
  };
};
