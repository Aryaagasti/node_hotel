const express = require("express");
const router = express.Router();

const MenuItem = require('../models/menuItem.model')

router.post('/',async(req,res)=>{
    try {
      const data = req.body

      const newMenuitem = new MenuItem(data)
      const result = await newMenuitem.save()
      console.log("data saved:", result);
      res.status(200).json(result); 

    } catch (error) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" }); // Provide a more generic error message
    }
  })
  router.get("/",async(req,res)=>{
    try {

      const data = await MenuItem.find()
      console.log("data fetched");
      res.status(200).json(data)
      
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" }); // Provide a more generic error message
    }
  })

  router.get("/:taste", async(req,res)=>{
    try {
        const tasteType = req.params.taste
        if(tasteType === 'sweet' || tasteType === 'spicy' || tasteType === 'sour'){
            const response = await MenuItem.find({taste: tasteType})
           console.log(" data fetch");
           res.status(200).json(response)
        }
        else{
            res.status(404).json({error: "Invalid tasteType"})
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" }); // Provide a more generic error message
    }
  })

  module.exports = router;