import Client from "../../../model/clientModel";
import dbConnect from "../../../services/db";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const clients = await Client.find({});
        res.status(200).json({ success: true, data: clients });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;

    case "POST":
      try {
        const { name, email, password } = req.body;

        if (!name && !email) throw "invalid data";
        const client = await Client.create({ name, email, password });

        res.status(201).json({ success: true, data: client });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
    // case "POST":
   
    //     const { email, password } = req.body;
    //     const user = users.find(u => u.email === email && u.password === password);

    //     if (!user) throw 'Username or password is incorrect';
    
    //     // create a jwt token that is valid for 7 days
    //     const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });
    
    //     // return basic user details and token
    //     return res.status(200).json({
    //         id: user.id,
    //         name: user.name,
    //         email: user.email,
    //         token
    //     });

  }
}
