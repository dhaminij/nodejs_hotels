const express = require('express')
const router = express.Router()
const Person =require('../models/Person')
router.post('/',async(req,res)=>{
    try {
        const data = req.body
        console.log(req.body);
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
})

router.get('/',async(req,res)=>{
    try {
        const data =  await Person.find()
        console.log('data fetched');
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
})

router.get('/:workType' , async(req,res)=>{
    try {
        const workType = req.params.workType
    if(workType == 'chef'|| workType == 'manager'|| workType =='waiter'){
        const response = await Person.find({work: workType})
        console.log('response fetched');
        res.status(200).json(response)
    }else{
        res.status(404).json({error:"invalid work type"})
    }
    } catch (error) {
        console.log(error);
        res.send(500).json({error:"internal server error"})
    }
})
router.put('/:id',async(req,res)=>{
    try {
        const personId = req.params.id
        const updatedPersonData =req.body
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
                new :true,
                runValidators :true
        })
        if(!response){
            return res.status(404).json({error:"person not found"})
        }
        console.log('data updated');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.send(500).json({error:"internal server error"})
    }
})
router.delete('/:id',async(req,res)=>{
    try {
        const personId = req.params.id
        const deletedPerson = await Person.findByIdAndDelete(personId)
        if (!deletedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }

        res.status(200).json({ message: 'Person deleted successfully', deletedPerson });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})
module.exports=router;