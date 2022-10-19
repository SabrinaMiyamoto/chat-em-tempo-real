let socket = io('http://localhost:3000')


document.getElementById("chat").submit(function(event){
    event.preventDefault()

    let author = $('input[name=username]').val()
    let message = $('input[name=message]').val()

    if(author.lenght && message.lenght){
        let messageObject = {
            author:author,
            message:message,
        }
        socket.emit('sendMessage', messageObject)
    }
})