import Remainder from "../models/remainder.model.js"

//Create Remainder
async function createRemainder (req, res){
    try{
        const newRemainder = await Remainder.create(req.body)
        res.json(newRemainder)
    }catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

//Get All Remainders 
async function getAllRemainders(req, res) {
    try {
        const allRemainders = await Remainder.find();
        res.json(allRemainders);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

//Get One Remainder
async function getOneById (req, res){
    try{
        const getOne = await Remainder.findById( req.params.id )
        res.json(getOne)
    }catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

//Edit one remainder
async function updateOne (req, res){
    const option ={
        new : true,
        runValidators: true
    }
    try{
        const updateOne = 
        await Remainder.findByIdAndUpdate( req.params.id, req.body, option)
        //req.body needs the data in order to update to wahtever field its updating
        res.json(updateOne)
    }catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

//Delete One remainder
async function deleteRemainder (req, res){
    try{
        const deleteOne = 
        await Remainder.findByIdAndDelete( req.params.id)
        //req.body needs the data in order to update to wahtever field its updating
        res.json(deleteOne)
    }catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export{
    createRemainder, getAllRemainders, getOneById, updateOne, deleteRemainder
}