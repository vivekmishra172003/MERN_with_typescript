import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser';
import express,{Request,Response,Application} from 'express'
import path from 'path'
const prisma = new PrismaClient()
const app:Application = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


app.get('/',(req:Request,res:Response):void=>{
    res.render('index');
})
app.post('/create',async (req:Request,res:Response): Promise<void>=>{
    const {username,email,password,age} = req.body;
    let craetedUser =  await prisma.user.create({
      data:{
          username,
          email,
          password,
          age: parseInt(age, 10)
      }
    })
    res.send(craetedUser);
});


app.listen(3000, () =>
  console.log('Server is running on http://localhost:3000')
)