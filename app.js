// import 'dotenv/config';
import dotenv from 'dotenv';
import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import axios from 'axios';
import morgan from 'morgan';
import debug from 'debug';
import userRoutes from './src/routes/userRoutes.js';
import clientRoutes from './src/routes/clientRoutes.js';
import * as model from './src/model.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Server config
dotenv.config({ path: './config/.env' });
const __dirname = dirname(fileURLToPath(import.meta.url));
let privateKey = '';
let certificate = '';
const app = express();
const PORT = process.env.PORT;
const privateKeyPath = path.join(__dirname, 'config', 'server.key');
const certificatePath = path.join(__dirname, 'config', 'server.cert');
try {
  privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  certificate = fs.readFileSync(certificatePath, 'utf8');
} catch (err) {
  console.error('Error reading SSL certificate files:', err);
  process.exit(1); // Exit process if the SSL files can't be read
}
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);
app.set('view engine', 'ejs');

// Init data
model.init();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/update', clientRoutes);
app.use('/', userRoutes);

// Logging
httpsServer.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
