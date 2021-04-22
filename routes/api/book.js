const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Book = require('../../models/Book');

// @route  GET api/book/me
// @desc   Get all book
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const book = await Book.find({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!book) {
            return res.status(400).json({ msg: 'There is no book for this user' });
        }
        res.json(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route  GET api/book/:id
// @desc   Get book by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(400).json({ msg: 'There is no book for this user' });
        }
        res.json(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


// @route  PUT api/book/:id
// @desc   Update book by ID
// @access Private
router.put('/:id', [
    auth,
    check('name', 'Name is required').not().isEmpty(),
    check('isbn', 'ISBN is required').not().isEmpty(),
    check('image', 'Image is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
], async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(400).json({ msg: 'There is no book for this user' });
        }
        const { name, isbn, image, author } = req.body;
        if (book) {
            book.name = name || book.name;
            book.isbn = isbn || book.isbn;
            book.image = image || book.image;
            book.author = author || book.author;

            const updatebook = await book.save();
            res.json(updatebook);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});



// @route  POST api/book
// @desc   Create or update book
// @access Private
router.post('/', [
    auth,
    check('name', 'Name is required').not().isEmpty(),
    check('isbn', 'ISBN is required').not().isEmpty(),
    check('image', 'Image is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, isbn, image, author } = req.body;

    //Build book object
    const bookFields = {};
    bookFields.user = req.user.id;
    if (name) bookFields.name = name;
    if (isbn) bookFields.isbn = isbn;
    if (image) bookFields.image = image;
    if (author) bookFields.author = author;
    try {
        let book = new Book(bookFields);
        const createbook = await book.save();
        res.json(createbook);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;