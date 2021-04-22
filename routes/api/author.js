const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Author = require('../../models/Author');

// @route  GET api/author/me
// @desc   Get all author
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const author = await Author.find({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!author) {
            return res.status(400).json({ msg: 'There is no book for this user' });
        }
        res.json(author);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route  GET api/author/:id
// @desc   Get author by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(400).json({ msg: 'There is no book for this user' });
        }
        res.json(author);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


// @route  PUT api/author/:id
// @desc   Update author by ID
// @access Private
router.put('/:id', [
    auth,
    check('firstName', 'Name is required').not().isEmpty(),
    check('lastName', 'ISBN is required').not().isEmpty(),
    check('email', 'Image is required').not().isEmpty(),
], async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(400).json({ msg: 'There is no book for this user' });
        }
        const { firstName, lastName, email } = req.body;
        if (author) {
            author.firstName = firstName || author.firstName;
            author.lastName = lastName || author.lastName;
            author.email = email || author.email;

            const updateAuthor = await author.save();
            res.json(updateAuthor);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});



// @route  POST api/author
// @desc   Create author
// @access Private
router.post('/', [
    auth,
    check('firstName', 'Name is required').not().isEmpty(),
    check('lastName', 'ISBN is required').not().isEmpty(),
    check('email', 'Image is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email } = req.body;

    //Build author object
    const authorFields = {};
    authorFields.user = req.user.id;
    if (firstName) authorFields.firstName = firstName;
    if (lastName) authorFields.lastName = lastName;
    if (email) authorFields.email = email;
    try {
        let author = new Author(authorFields);
        const createAuthor = await author.save();
        console.log("Test", createAuthor);
        res.json(createAuthor);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;