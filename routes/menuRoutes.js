const express =require('express')
const router= express.Router();

const MenuItem = require('../models/menu');
// const { route } = require('./personRoutes');
router.post('/',async(req,res)=>{
    try {
        const data = req.body;
        const menu = new MenuItem(data)
        const response = await menu.save();
        console.log('data saved');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
})

router.get('/',async(req,res)=>{
    try {
        const menu = await MenuItem.find()
    console.log('data fetched');
    res.status(200).json(menu)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
})
router.get('/:taste',async(req,res)=>{
    try {
        const taste = req.params.taste
        if(taste == "spicy"||taste =="sweet"||taste=='sour'){
            const response = await MenuItem.find({taste:taste})
            console.log('response fetched');
            res.status(200).json(response)
        }else{
            res.status(404).json({error:"invalid taste type"})
        }
    } catch (error) {
        console.log(error);
        res.send(500).json({error:"internal server error"})
    }
})
router.delete('/:id',async(req,res)=>{
    try {
        const menuId = req.params.id
        const response = await MenuItem.findByIdAndDelete(menuId)
        if(!menuId){
            return res.status(404).json({message:"no item found"})
        }
        res.status(200).json({ message: 'menu deleted successfully', response });
    } catch (error) {
        console.log(error);
        res.send(500).json({error:"internal server error"})
    }
})
module.exports = router;