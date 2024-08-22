const express = require('express');
const router = express.Router();
const Article=require("../models/article")
// afficher la liste des articles.
router.get('/', async (req, res, )=> {
try {
const articles = await Article.find({}, null, {sort: {'_id': -
1}}).populate("scategorieID");
res.status(200).json(articles);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// créer un nouvel article
router.post('/', async (req, res) => {
const nouvarticle = new Article(req.body)
try {
const response =await nouvarticle.save();
const articles = await
Article.findById(response._id).populate("scategorieID").exec();
res.status(200).json(articles);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// chercher un article
router.get('/:articleId',async(req, res)=>{
try {
const art = await Article.findById(req.params.articleId);
res.status(200).json(art);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// modifier un article


router.put('/:articleId', async (req, res)=> {
try {
const art = await Article.findByIdAndUpdate(
req.params.articleId,
{ $set: req.body },
{ new: true }
);
const articles = await
Article.findById(art._id).populate("scategorieID").exec();
res.status(200).json(articles);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer un article
router.delete('/:articleId', async (req, res)=> {
const id = req.params.articleId;
try {
await Article.findByIdAndDelete(id);
res.status(200).json({ message: "article deleted successfully." });
} catch (error) {
res.status(404).json({ message: error.message });
}
});
module.exports = router;
router.get('/art/pagination', async(req, res) => {
    const filtre = req.query.filtre || "";
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    
    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const articles = await Article.find({ designation: { $regex: filtre, $options:
        "i"}}, null, {sort: {'_id': -1}}).populate("scategorieID").exec()
    // Slice the products array based on the indexes
    const paginatedProducts = articles.slice(startIndex, endIndex);
    // Calculate the total number of pages
    const totalPages = Math.ceil(articles.length / pageSize);
    
    // Send the paginated products and total pages as the API response
    res.json({ products: paginatedProducts, totalPages });
    });