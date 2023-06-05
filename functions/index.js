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
