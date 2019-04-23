/* eslint-disable consistent-return */




const admin = (req, res, next) => {
    if (!req.user.isAdmin)
        return res.status(403).send('Access Denied');
}

module.exports = admin;