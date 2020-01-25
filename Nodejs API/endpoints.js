const initializeEndpoints=(app)=>{
    app.get('/users/:id',(req,res)=>res.end('This should return user with Id'))
}
module.exports=initializeEndpoints