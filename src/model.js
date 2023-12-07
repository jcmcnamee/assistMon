import data from '../data/assistData.json' assert { type: 'json' };
import { notifyClients } from './userController.js';

export function init() {
  console.log('Initialising data');
  return data;
}

export async function updateStatus(clientId, status) {
  console.log('Stepped into model');
  data.forEach(assist => {
    if (assist.id == clientId) {
      assist.status = status;
      // assist.user = status.user;
      console.log(assist);
      try {
       notifyClients(assist);
      } catch (err) {
        console.log(err)
      }
      
    }
  });
}
