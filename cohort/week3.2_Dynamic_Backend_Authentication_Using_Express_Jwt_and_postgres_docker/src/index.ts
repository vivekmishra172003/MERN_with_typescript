import express,{Request,Response} from 'express'
import axios from 'axios'
import path from 'path'


const app = express();
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'../views'))

app.get('/',(req:Request,res:Response)=>{
    res.render('index')
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});