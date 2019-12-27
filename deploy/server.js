const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('./dist/social-frontend'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/social-frontend/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('listening on port ' + port);
