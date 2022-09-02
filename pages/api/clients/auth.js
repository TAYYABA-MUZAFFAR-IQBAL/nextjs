import Client from "../../../model/clientModel";
import dbConnect from "../../../services/db";
// import { jwt } from 'jsonwebtoken'
import { jwtTokenCreate } from "jwt-next-auth";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      const { email, password } = req.body;
      
      const user = await Client.find({ email: email });
      if (!user && user.password===! password ) {
        throw  "Username or password is incorrect";
      } 
    else{
        // const user = Client.find((u) => {
        //   u.email === email && u.password === password;
        // });
      console.log(user);

    //   if (!user) throw "Username or password is incorrect";
      const token = await jwtTokenCreate({ sub: user.id });

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      });
  }
}
}