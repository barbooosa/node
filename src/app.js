import express from 'express'
const app = express()
//indicar para o express ler body com json  
app.use(express.json())

//mock=simulação
const selecoes = [
    {id:1, selecao: 'Brasil', grupo: 'G'},
    {id:2, selecao: 'Alemanha', grupo: 'G'},
    {id:3, selecao: 'França', grupo: 'G'},
    {id:4, selecao: 'Marrocos', grupo: 'G'},
]

function Buscarselecaoporid(id){
    return selecoes.filter(selecao=>selecao.id==id)
}
app.get('/selecoes/:id',(req,res)=>{

    res.json(Buscarselecaoporid(req.params.id))//busca por id
})
function buscarindexselecao(id){
    return selecoes.findIndex( selecao => selecao.id == id )
}


//criar rota padrão
app.get('/',(req,res)=>{
    res.status(200).send('faz o L sette fibro')
                //status 200=sucesso
})
app.get('/selecoes',/*colocar dps da porta*/ (req,res)=>{
    res.status(200).send(selecoes)
})

app.post('/selecoes' ,(req,res)=>{
    selecoes.push(req.body)
    res.status(201).send('Seleçao ta certa uai')
})

app.delete('/selecoes/:id',(req,res)=>{
    let index = buscarindexselecao(req.params.id)
    selecoes.splice(index, 1)
    res.send(`Selecao com id ${req.params.id} excluida com sucesso `)
})

app.put('/selecoes/:id',(req,res)=>{
    let index = buscarindexselecao(req.params.id)
    selecoes[index].selecao = req.body.selecao
    selecoes[index].grupo   = req.body.grupo
    res.json(selecoes)
})



export default app 