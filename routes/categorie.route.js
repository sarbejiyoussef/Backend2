const express=require("express")
const Categorie=require("../models/categorie")
const req = require("express/lib/request")
const { verifyToken } = require("../models/middleware/verify-token")
const { authorizeRoles } = require("../models/middleware/authorizeRoles")
const router=express.Router()

router.post("/",verifyToken,authorizeRoles("admin","visiteur"),async (req,res)=>{
    const cat1= new Categorie(req.body)
    try{
        await cat1.save()
        res.status(200).json(cat1)

    }
    catch (error){
        res.status(404).json({message:error.message})
    }
})
router.get ("/",verifyToken,async(req,res)=>{
    try{
        const cat=await Categorie.find({}, null, {sort: {'_id': -1}})
        res.status(200).json(cat)
    }
    catch (error){
        res.status(404).json({message:error.message})
    }
})
    router.get ("/:id",async(req,res)=>{
        try{
            const cat=await Categorie.findById(req.params.id)
            res.status(200).json(cat)
        }
        catch (error){
            res.status(404).json({message:error.message})
        }
        router.put('/:id', async (req, res)=> {
            try {
            const cat1 = await Categorie.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
            );
            res.status(200).json(cat1);
            } catch (error) {
            res.status(404).json({ message: error.message });
            }
            });

})
module.exports=router;