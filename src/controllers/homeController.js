// homeController.js
const Expense = require('../models/homeModel');

const addExpense = async (req, res) =>{

    try{

        const {amount, description, category}=req.body;

        if(!amount || !description || !category){
            res.status(400).json({error:"All fields are required"});
            return;
        }
        
      
        const  expense = await Expense.create({amount, description, category});

        res.status(201).json({message: "Expense added Sucessfully", expense});
    
    
    }catch(error){
        res.status(500).json({error:error.message})
    }

}


const getExpense = async (req,res) =>{
    try{
        const expenses = await Expense.findAll();
        res.status(200).json({expenses});

    }catch(error){
        res.status(500).json({error: error.message});
    }
}


module.exports = { addExpense, getExpense }; 

