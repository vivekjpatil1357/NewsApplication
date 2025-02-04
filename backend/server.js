const express = require('express')


const app = express()



app.get('/', (req, res) => {
    return res.send("got u")
})
app.listen(3000, () => {
    console.log("started on 3000...");
})