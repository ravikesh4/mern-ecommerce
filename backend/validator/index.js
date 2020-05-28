exports.userSignupValidator =  (req, res, next) => {
    req.check('name', 'Name is required').notEmpty()
    req.check('email', 'Email must be between 3 to 32 character').matches(/.+\@.+\..+/)
    .withMessage('EMail must contain @')
    .isLength({
        min: 4,
        max: 32
    });
    req.check('password', 'Password is required').notEmpty()
    .req.check('password')
    .isLength({min: 6})
    .withMessage('Password must contain at least 6 character')
    .matches(/\d/)
    .withMessage('Password must contain number')

    const errors = req.validationError()
    if(errors) {
        const firstError = error.mao(error => error.msg)[0];
        return res.status(400).json({ error: firstError})
    }
    next();
}