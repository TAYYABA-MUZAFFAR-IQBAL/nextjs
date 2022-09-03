import Client from "../../../model/clientModel";
import dbConnect from "../../../services/db";
// import { jwt } from 'jsonwebtoken'
import { jwtTokenCreate } from "jwt-next-auth";

dbConnect();

export default async function handler(req, res) {
      const { email, password } = req.body;
      if(!email || !password){
        return res.status(422).json({error:"please fill all the fields"})
      }
      
      const user = await Client.findOne({email})
      const doMatch =  (password === user.password)
      // console.log(user);
      if (!user &&  !doMatch ) {
        throw  "Username or password is incorrect";
      }

      const token = await jwtTokenCreate({ sub: user.id });
    
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      });
  
}