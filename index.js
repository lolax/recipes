const server = require('./server.js')

server.listen(process.env.PORT || 3300, () => console.log('\n~servin up on port 3300~\n'))
