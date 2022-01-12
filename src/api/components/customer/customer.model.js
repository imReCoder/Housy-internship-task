import db from "../../../loaders/firebase-connect.js";
import admin from "firebase-admin";

const customerCollectionRef = db.collection('customers');

export const addCustomer = async (req, res) => {
  try {
    console.log("adding customer", req.body);
    const customerData = req.body;
    customerData.id = customerCollectionRef.doc().id;

    const result = await customerCollectionRef.doc(customerData.id).set(customerData);
    console.log("db result ", result);
    return res.status(200).json({
      resultMessage: "Customer added",
      result: customerData
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
      result
    });
  } catch (e) {
    return res.status(200).json({
      resultMessage: e.message,
    });
  }
}

export const getCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    console.log("get customer ", customerId);
    const customer = (await customerCollectionRef.doc(customerId).get()).data()
    console.log("db result ", customer);
    return res.status(200).json({
      resultMessage: "Here is your customer",
      result: customer
    });
  } catch (e) {
    return res.status(200).json({
      resultMessage: e.message,
    });
  }
}

export const sendNotification = async (req, res) => {
  try {
    const city = req.query.city;
    console.log("sennding notification");
    let data
    if (city) {
      data = await customerCollectionRef.where('city', '==', city).get();
    } else {
      data = await customerCollectionRef.where('registrationToken', '!=', null).get();
    }
    const registrationTokens = [];
    const customers = [];
    data.forEach(doc => {
      customers.push(doc.data());
    });
    for (let customer of customers) {
      registrationTokens.push(customer.registrationToken);
    }


    const message = {
      data: { name: 'Testing Push Notification', time: '2:45' },
      tokens: registrationTokens,
      notification: {
        title: 'Test message',
        body: 'Hello Nodejs'
      },
    };

    const result = await sendMessageToTokens(message);
    if (result.error) throw new Error(result.message);
    res.status(200).json({
      resultMessage: `Sent Notification`,
      result
    })
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      resultMessage: e.message,
    });
  }


}
const sendMessageToTokens = async (message) => {
  console.log("sending to notification to ", message.tokens);
  return new Promise((resolve) => {
    try {
      admin.messaging().sendMulticast(message)
        .then((response) => {
          const failedTokens = [];
          if (response.failureCount > 0) {
            response.responses.forEach((resp, idx) => {
              if (!resp.success) {
                failedTokens.push(registrationTokens[idx]);
              }
            });
          }
          console.log('List of tokens that caused failures: ' + failedTokens);
          return resolve({ error: false, failedTokens, successCount: response.successCount });
        }).catch((e) => {
          console.log(e);
        });
    } catch (e) {
      resolve({ error: true, message: e });
    }

  })
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
const getAllCustomers = async () => {
  const snapshot = await customerCollectionRef.get()
  return snapshot.docs.map(doc => doc.data());
}
