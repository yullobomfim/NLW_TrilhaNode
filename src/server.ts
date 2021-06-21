import express from "express";

//@types/express
const app = express();

//Rota do GET
app.get("/test",(request, response)=>{
    response.send("Olá NLW");

})
//Rota do POST
app.post("/test-post",(request,response)=>{
return response.send("Olá NLW metodo POST");
});

//http://localhost:3000
app.listen(3000, ()=>console.log("Server is running, NLW"));