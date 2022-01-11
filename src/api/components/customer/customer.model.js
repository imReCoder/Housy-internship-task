import db from "../../../loaders/firebase-connect.js";


const customerCollectionRef = db.collection('customers');

export const addCustomer = async (req, res) => {
  try {
    console.log("adding customer", req.body);
    const customerData = req.body;
    const result = await customerCollectionRef.doc(customerData.name).set(customerData);
    console.log("db result ", result);
    return res.status(200).json({
      resultMessage: "Customer added",
    });
  } catch (e) {
    return res.status(200).json({
      resultMessage: e.message,
    });
  }
}

export const updateCustomer = async (req, res) => {
  try {
    console.log("updaing customer");
    const customerData = req.body;
    const result = await customerCollectionRef.doc(customerData.name).update(customerData);
    console.log("db result ", result);
    return res.status(200).json({
      resultMessage: "Updated customer",
    });
  } catch (e) {
    return res.status(200).json({
      resultMessage: e.message,
    });
  }
}

export const getCusstomer = async (req, res) => {
  try {
    console.log("get customer");
    const customerData = req.body;
    const result = await customerCollectionRef.doc(customerData.name).get();
    console.log("db result ", result);
    return res.status(200).json({
      resultMessage: "Here is your customer",
      result
    });
  } catch (e) {
    return res.status(200).json({
      resultMessage: e.message,
    });
  }
}

export const sendNotification = (req, res) => {
  try {
    console.log("sennding notification");
    return res.status(200).json({
      resultMessage: "Notification Sent",
    });
  } catch (e) {
    return res.status(200).json({
      resultMessage: e.message,
    });
  }
}

export const deleteCustomer = async (req, res) => {
  try {
    console.log("delete customer");
    const customerData = req.body;
    const result = await customerCollectionRef.doc(customerData.name).delete();
    console.log("db result ", result);
    return res.status(200).json({
      resultMessage: "Customer deleted",
    });
  } catch (e) {
    return res.status(200).json({
      resultMessage: e.message,
    });
  }
}