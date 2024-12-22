const express = require('express')
const router = express.Router()
const Person =require('../models/Person')
const {jwtAuthMiddleware,generateToken} = require('./../jwt')
router.post('/signup',async(req,res)=>{
    try {
        const data = req.body
        console.log(req.body);
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id:response.id,
            username:response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("token is",token);

        res.status(200).json({response:response,token:token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
})

router.post('/login',async(req,res)=>{
    try {
        const {username,password} = req.body;

        const user = await Person.findOne({username:username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid username or password"})
        }
        const payload ={
            id : user.id,
            username:user.username
        }
        const token = generateToken(payload)
        res.json({token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
})

// profile
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try {
        const userData= req.user
        const userId = userData.id
        const user = await Person.findById(userId)

        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
})


router.get('/',jwtAuthMiddleware,async(req,res)=>{
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