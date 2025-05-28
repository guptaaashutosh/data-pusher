const axios = require('axios');
const Account = require('../account/account.model');
const Destination = require('../destination/destination.model');

exports.handleIncomingData = async (req, res) => {
  // 1. Check for secret token
  const secretToken = req.headers['cl-x-token'];
  if (!secretToken) {
    return res.status(401).json({ message: 'Un Authenticate' });
  }

  // 2. Validate JSON data for GET method
  if (req.method === 'GET' && !req.is('application/json')) {
    return res.status(400).json({ message: 'Invalid Data' });
  }

  try {
    // 3. Find account by secret token
    const account = await Account.findOne({
      where: { appSecretToken: secretToken }
    });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // 4. Get all destinations for this account
    const destinations = await Destination.findAll({
      where: { AccountId: account.id }
    });

    // 5. Send data to each destination
    const promises = destinations.map(destination => {
      const config = {
        method: destination.httpMethod,
        url: destination.url,
        headers: destination.headers
      };

      if (destination.httpMethod === 'GET') {
        config.params = req.body;
      } else {
        config.data = req.body;
      }

      return axios(config).catch(error => {
        console.error(`Error sending to ${destination.url}:`, error.message);
        return { success: false, url: destination.url, error: error.message };
      });
    });

    const results = await Promise.all(promises);

    res.json({
      message: 'Data processed',
      results: results.map((result, index) => ({
        destination: destinations[index].url,
        status: result.status || 'failed',
        data: result.data || null
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
