const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const requireAuth=require('../middleware/authMiddleware')



router.use(requireAuth);

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 })
        res.status(200).json(transactions)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


router.post('/',async (req,res)=>{
    try {
        const newTrans=await Transaction.create(req.body)
        res.status(200).json(newTrans)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})



router.delete('/:id' ,async (req,res)=>{
    try {
        const trans=await Transaction.findByIdAndDelete(req.params.id)
        if(!trans){
            res.status(404).json({message:"Transaction not found"})
        }else{
            res.status(200).json({message:"Transaction deleted"})}
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router;