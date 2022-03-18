
const printInfo = (req, res) => {
    res.send({name:'hong'})  
    // body:{
    //     'method':req.method,
    //     'path':req.path,
    //     'params':req.params,
    // }
};

module.exports = {printInfo}