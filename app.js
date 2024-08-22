const express=require('express');
const mongoose =require("mongoose")
const dotenv =require('dotenv')
const app = express();
const categorieRouter=require("./routes/categorie.route")
const scategorieRouter =require("./routes/scategorie.route")
const articleRouter =require("./routes/article.route")
const userRouter = require("./routes/user.route")
const cors=require("cors")
app.use(cors())
//config dotenv
dotenv.config()

//BodyParser Middleware
app.use(express.json());
// Connexion à la base données
mongoose.connect(process.env.DATABASE)
.then(() => {console.log("DataBase Successfully Connected");})
.catch(err => { console.log("Unable to connect to database", err);
process.exit(); });
// requête
app.get("/",(req,res)=>{
res.send("bonjour");});


app.use("/api/categories",categorieRouter)
app.use('/api/scategories', scategorieRouter);
app.use('/api/articles', articleRouter);
app.use('/api/users', userRouter);
app.listen(process.env.PORT, () => {
console.log(`Server is listening on port ${process.env.PORT}`); });
module.exports = app;