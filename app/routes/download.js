const express = require('express');
const router = express.Router();

// Download routes /download/:(Next Routes)
router.get('/mirrow/:mirror/latest', function(req, res) {
  res.send('Version updater api compatible with squirell');
});

router.get('/:plataform/latest', function(req, res) {
  res.send('Version updater api compatible with squirell');
});


module.exports = router;
