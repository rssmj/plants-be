import { server } from './api/server.js'

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`\n server up on ${port} \n`);
});
