const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = app => {
    app.post("/api/register", Users.register);
    app.post("/api/login", Users.login);
    app.get('/api/logout', Users.logout)
    app.get('/api/getUser', authenticate, Users.getUser)
    app.patch('/api/user/:id', authenticate, Users.updateOne)
    app.patch('/api/user/remove/:id', authenticate, Users.updateOneRemove)  
}