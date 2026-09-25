require("dotenv").config();
const express = require("express"); //Servidor
const usuarioModel= require("./models/usuarioModel");
const app=express();

app.use(express.json());

const PORT=Number(process.env.PORT || 3000);

app.get("/usuarios", async (req,resp)=>{

});


app.post("/usuarios", async (req,resp)=>{

try{
    const {nome,email,senha} = await req.body;

        const dados={
            "nome":nome,
            "email":email,
            "senha":senha
        }
    if(await usuarioModel.cadastrarUsuario(dados)){
        resp.status(200).json({"mensagem":"usuario cadastrado com sucesso!"})
    }else{
        throw new Error("Problema no banco de dados ao cadastrar usuario!")
    }

    }catch(erro){
        console.log("Erro: ",erro)
        resp.status(500).json({"mensagem": "Erro ao cadastrar usuario!"})
    }

})


app.post("/login", async (req,resp)=>{
    const {email,senha}= req.body;
    const usuario= await usuarioModel.buscarPorEmail(email);
});

app.listen(PORT,()=>{
    console.log(`O servidor esta rodando na porta:localhost:${PORT}`)
    })

    try{
        const usuarios = await usuarioModel.listarusuarios();
        resp.status(200).json(usuarios)
    }catch(error){
        console.log("Erro:",error)
        resp.status(500).json({"erro":error})
    };