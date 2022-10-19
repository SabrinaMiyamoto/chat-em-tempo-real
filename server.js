const express =  require ('express')
const path = require ('path')


const app = express()
const server = require ('http').createServer(app)
const io = require('socket.io')(server)


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))

//para não precisar fazer em ejs, eu renderizo para html
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) =>{
    res.render('index.html')
})

let messages= [];

//conexão com socket

io.on('connection', socket =>{
    console.log(` conectado: ${socket.id} `)
    
    //envia as mensagens enviadas anteriores ao usuário no servidor
    socket.emit('previousMessages', messages)

    //deixa as mensagens na div para que possam ser lidas
    socket.on('sendMessage', data => {

        messages.push(data)

        socket.broadcast.emit('receivedMessage', data)
    })
})




server.listen(3000)