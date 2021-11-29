// import express for using it 
const express = require('express');
// getting router portion of that express so that we can use in routes  
const router = express.Router();

router.get('/', (req, res)=>{
res.render("index")
})

module.exports = router;