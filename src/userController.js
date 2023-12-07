import * as model from './model.js';
let clients = [];

export const renderMain = (req, res) => {
  res.render('index.ejs', { data: model.init() });
};

// This will register the SSE client
export const registerClient = (req, res) => {

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push({ id: Date.now(), res });

  // Remove clients when they disconnect
  req.on('close', () => {
    clients = clients.filter(client => client.res !== res);

  });
};

export const notifyClients = assist => {
  console.log(`Stepped into notifyClients: `, assist);
  try {
    clients.forEach(client =>
       client.res.write(`data: ${JSON.stringify(assist)}\n\n`)
    );
  } catch (err) {
    console.log(err);
  }
};
