// import express for using it 
const express = require('express');
// getting router portion of that express so that we can use in routes  
const router = express.Router();
const Author = require('../models/author');

// all authors route 
router.get('/', async(req, res) => {
    let searchOptions ={}

    if (req.query.name != null && req.query.name !== ''){
       searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
    const authors = await Author.find(searchOptions)
    res.render("authors/index", {
        authors : authors, searchOptions:req.query})
    }
    catch{
    res.redirect('/')
    }

})
// new author route
router.get('/new', (req, res)=>{
    res.render("authors/new" , {author : new Author()})
    })

// create author route 
router.post("/", async(req,res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
            res.redirect("authors")
    } 
    catch {
        res.render("authors/new",{
         author : author,
         errorMessage:"Error creating the Author "
        })
    }
})

module.exports = router;