module.exports = app => {
    require('../app/user/user.route')(app);
    require('../app/environment/environment.route')(app);
}