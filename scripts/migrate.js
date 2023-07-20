const fs = require('fs') ;

const fileList = './prisma/schema.prisma';
const fileListBak = './prisma/schema.bak.prisma';

fs.readFile(fileList, function(err, data) {
    if(err) throw err;
    data = data.toString();
    // data = data.replace(/^\.(.+)/gm, 'myString$1');
    console.log(data)
    fs.writeFile(fileListBak, data, function(err) {
        err || console.log('Data replaced \n', data);
    });
});