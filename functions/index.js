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
      const serialNumber = await generateSerial(
        admin.firestore().collection("Customer")
      );
      const writeResult = await admin
        .firestore()
        .collection("Customer")
        .add({ ...customer, serial: serialNumber });
      res.json({
        success: true,
        result: `Customer saved successfully with id ${writeResult.id}`,
        data: {
          ...customer,
          serial: serialNumber,
          id: writeResult.id,
        },
      });

      const customerRef = admin
        .firestore()
        .collection("Customer")
        .doc(writeResult.id);

      await customerRef.set(
        {
          id: writeResult.id,
        },
        { merge: true }
      );
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
    const customerCollection = admin.firestore().collection("Customer");

    const list = await (await customerCollection.get()).docs;
    const customers = list.map((item) => mapCustomer(item));

    res.json({ customers });
  });
});

exports.updateCustomer = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const customer = req.body.customer;
    if (customer.id) {
      const customerRef = admin
        .firestore()
        .collection("Customer")
        .doc(customer.id);

      await customerRef.update(customer);

      res.json({
        success: true,
        result: "Customer updated",
      });
    } else {
      res.json({
        success: true,
        result: "Please provide a customer id",
      });
    }
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

const getPaginatedList = async (pageNumber, pageSize, query) => {
  let list = [];
  if (pageNumber === 1) {
    list = await (await query.limit(pageSize).get()).docs;
  } else {
    const first = query.limit((pageNumber - 1) * pageSize);
    const snapshot = await first.get();
    // Get the last document
    const last = snapshot.docs[snapshot.docs.length - 1];
    list = await (await query.startAfter(last).limit(pageSize).get()).docs;
  }

  return list;
};

exports.saveInvoice = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const invoice = req.body.invoice;
    if (invoice.customer) {
      const serialNumber = await generateSerial(
        admin.firestore().collection("Invoice")
      );
      const writeResult = await admin
        .firestore()
        .collection("Invoice")
        .add({ ...invoice, serial: serialNumber });
      res.json({
        success: true,
        result: `Invoice saved successfully`,
      });
      const invoiceRef = admin
        .firestore()
        .collection("Invoice")
        .doc(writeResult.id);

      await invoiceRef.set(
        {
          id: writeResult.id,
        },
        { merge: true }
      );
    } else {
      res.json({
        success: false,
        result: "Please provide a customer for invoice",
      });
    }
  });
});

exports.getInvoice = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const invoiceId = req.query?.invoiceId;
    if (invoiceId) {
      const invoiceRef = admin.firestore().collection("Invoice").doc(invoiceId);
      const invoice = (await invoiceRef.get()).data();
      res.json({ invoice });
    } else {
      res.json({ success: false, result: "Please provide invoice id" });
    }
  });
});

exports.getInvoices = onRequest(async (req, res) => {
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
        orderByField = "createdAt";
        break;
      case "totalWithTax":
        orderByField = "totalWithTax";
        break;
      default:
        orderByField = "createdAt";
        break;
    }

    const invoiceCollection = admin.firestore().collection("Invoice");

    let query = orderDesc
      ? invoiceCollection.orderBy(orderByField, "desc")
      : invoiceCollection.orderBy(orderByField);

    let list = await getPaginatedList(pageNumber, pageSize, query);

    const count = (await query.count().get()).data().count;

    const invoices = list.map((item) => mapInvoice(item));

    const pagination = getPageDetails(pageNumber, pageSize, count);
    res.json({ invoices, pagination });
  });
});

const generateSerial = async (collection) => {
  const queryResult = await collection.orderBy("serial", "desc").limit(1).get();
  const latestResult = await queryResult.docs;
  const serial = latestResult && latestResult[0]?.get("serial");

  let returnValue = 1;
  if (serial) {
    returnValue = serial + 1;
  }
  return returnValue;
};

const mapInvoice = (item) => {
  if (!item) {
    return null;
  }
  return {
    customer: item.get("customer"),
    creditTerms: item.get("creditTerms"),
    itemListing: item.get("itemListing"),
    totalWithoutTax: item.get("totalWithoutTax"),
    serial: item.get("serial"),
    taxAmount: item.get("taxAmount"),
    totalWithTax: item.get("totalWithTax"),
    createdAt: item.get("createdAt"),
    id: item.get("id"),
  };
};

const mapCustomer = (item) => {
  if (!item) {
    return null;
  }
  return {
    name: item.get("name"),
    address: item.get("address"),
    contactPerson: item.get("contactPerson"),
    phoneNumber: item.get("phoneNumber"),
    mobileNumber: item.get("mobileNumber"),
    email: item.get("email"),
    serial: item.get("serial"),
    fax: item.get("fax"),
    salesTaxNumber: item.get("salesTaxNumber"),
    ntn: item.get("ntn"),
    openingBalanceAmount: item.get("openingBalanceAmount"),
    openingBalanceDate: item.get("openingBalanceDate"),
    currentBalance: item.get("currentBalance"),
    createdAt: item.get("createdAt"),
    id: item.get("id"),
  };
};

exports.getCustomerInvoices = onRequest(async (req, res) => {
  cors(req, res, async () => {
    let customerId = req.query?.customerId;
    if (customerId) {
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
          orderByField = "createdAt";
          break;
        case "totalWithTax":
          orderByField = "totalWithTax";
          break;
        default:
          orderByField = "createdAt";
          break;
      }

      const invoiceCollection = admin
        .firestore()
        .collection("Invoice")
        .where("customer.id", "==", customerId);

      let query = orderDesc
        ? invoiceCollection.orderBy(orderByField, "desc")
        : invoiceCollection.orderBy(orderByField);

      let list = await getPaginatedList(pageNumber, pageSize, query);

      const count = (await query.count().get()).data().count;

      const invoices = list.map((item) => mapInvoice(item));

      const pagination = getPageDetails(pageNumber, pageSize, count);
      res.json({ invoices, pagination });
    } else {
      res.json({
        success: false,
        result: "Please provide a customer id",
      });
    }
  });
});
