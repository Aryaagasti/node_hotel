const express = require("express");
const router = express.Router();




const Person = require('../models/person.model') // Load the Person model after connection


router.post("/", async (req, res) => {
    try {
      const data = req.body; // Assuming the request body contains the person data

      // Create a new person document using the mongoose model
      const newPerson = new Person(data);

      // Save the new person to the database
      const response = await newPerson.save();
      console.log("Data saved:", response);

      res.status(200).json(response); // Set status code before sending response
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" }); // Provide a more generic error message
    }
  });

  router.get("/",async(req,res)=>{
    try {
      const data = await Person.find()
      console.log("data fetched");
      res.status(200).json(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" }); // 
    }
  })

   //performing params API
  router.get("/:workType",async(req,res)=>{

    try {
      const workType = req.params.workType;
    if(workType === 'chef' || workType === 'manager' || workType === 'waiter'){
        const response =  await Person.find({work: workType})
        console.log("response fetched");
        res.status(200).json(response)
    }
    else{
      res.status(404).json({error: "Invalid workType"})
    }
    } catch (err) {
      console.error(err);
    res.status(500).json({ message: "Something went wrong" }); // Provide a more generic error message
    }

})
//update operation through put method http
router.put("/:id",async(req,res)=>{
    try {
        const personId = req.params.id; //extract the id from the url parameter
        const updatedPersonData = req.body; // updated data for the person

        const response =  await Person.findByIdAndUpdate(personId,updatedPersonData,{
             new: true,  //return upadted document
             runValidators: true  //run mongoose validation
        })
        if(!response){
            return res.status(404).json({error: 'person not found'})
        }

        console.log("data upadated");
        res.status(200).json(response)

    } catch (err) {
        console.error(err);
    res.status(500).json({ message: "Something went wrong" }); // Provide a more generic error message
    }
})

//delete operation throug delete method http
router.delete("/:id",async(req,res)=>{
  try {
    const personId = req.params.id; //extract the id from the url parameter

    //Assuming you have a person model
    const response = await Person.findByIdAndDelete(personId)
    if(!response){
      return res.status(404).json({error: 'person not found'})
  }

  console.log("data upadated");
  res.status(200).json({message: 'data deleted of person'})

  } catch (err){
    console.error(err);
    res.status(500).json({ message: "Something went wrong" }); // Provide a more generic error message
  }
})

module.exports = router;