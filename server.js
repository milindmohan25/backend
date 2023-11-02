const app = require('./app');

const CONFIG = require('./config/config');
const connectToDB = require('./db/mongodb');

connectToDB();

app.listen(CONFIG.PORT, () => {
  console.log(`Server is running on http://localhost:${CONFIG.PORT}`);
});
