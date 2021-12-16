const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api',
        createProxyMiddleware({
            target: 'https://vinci-2nd-hand-prod.herokuapp.com/',
            changeOrigin: true,
        })
        
    );
};