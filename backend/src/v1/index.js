const routes = [require('./routes/authRoutes')];

module.exports = function router(app) {
return routes.forEach((route) => {
route(app);
})};