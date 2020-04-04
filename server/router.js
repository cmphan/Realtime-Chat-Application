const express = require('express');
const router = express.Router();
// Get request to the root route
router.get('/',(req,res) => {
    res.send('server is up and running');
});
module.exports = router;