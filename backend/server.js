const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes=require('./routes/userRoutes')
const transactionRoutes = require('./routes/TransactionRoutes');



dotenv.config()
const app = express();


//middleware
app.use(express.json());
app.use(cors())



//connect to mongoose
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected to mongoDB');
}).catch((err) => {
    console.log(err);
    console.log('failed to connect to mongoDB');
})




//using routes
app.use('/api/transactions', transactionRoutes)
app.use('/api/users',userRoutes)






app.get('/', (req, res) => {
    res.send("hello world");
})



const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}`);

})