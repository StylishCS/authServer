var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req,res) => {
  return res.status(200).json("server works...")
});

module.exports = router;
