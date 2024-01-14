const auth = (req, res, next) => {
 if (req.session.userId) return next();
 if (req.method === 'GET') return res.redirect('/');
 return res.status(401).end();
}

export { auth };