import * as model from './model.js';

export const updateModel = async (req, res) => {
  try {
    // Parse data
    const clientID = Number(req.params.clientID);
    let status = req.body.status;
    console.log(clientID, status);

    // Clean data
    status = status.split(' ')[0];

    // Update model
    model.updateStatus(clientID, status);
    await res.status(200).json({ message: 'Data processed' });
  } catch (err) {
    console.error(err);
  }
};
