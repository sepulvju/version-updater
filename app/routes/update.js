const express = require('express');
const router = express.Router();

// Update routes /update/:(Next Routes)
router.get('/darwin', function(req, res) {
  res.send('Version updater api compatible with squirell');
});

router.get('/win32/portable', function(req, res) {
  res.send('Version updater api compatible with squirell');
});

router.get('/win32/:file', function(req, res) {
  res.send('Version updater api compatible with squirell');
});

router.get('/linux', function(req, res) {
  res.send('Version updater api compatible with squirell');
});

router.get('/:channel/darwin', function(req, res) {
  res.send('Version updater api compatible with squirell');
});

router.get('/:channel/win32/portable', function(req, res) {
  res.send('Version updater api compatible with squirell');
});

router.get('/:channel/win32/:file', function(req, res) {
  res.send('Version updater api compatible with squirell');
});

router.get('/:channel/linux', function(req, res) {
  res.send('Version updater api compatible with squirell');
});


module.exports = router;
