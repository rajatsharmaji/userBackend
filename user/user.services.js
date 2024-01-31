import User from './user.model.js'

export const getUser = async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password);
    const user = await User.findOne({Email:email});
    console.log(user);
    if(!user){
        res.send({msg:"user does not exist"})
    }
    else
    {
        const userPassword = await user.Password;
        if(userPassword!=password){
            res.send({msg:"Incorrect password"})
        }
        else{
            res.send("Login successfully")
        }
    }
}

export const addUser = async(req,res) =>{
    console.log(req);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const dob = req.body.dob;
    const uuid = req.body.uuid;
    
    const newUser = new User({
         Name: name,
         Email: email,
         Password: password,
         DOB: dob,
         UUID: uuid,
})
    await newUser.save();
    res.send({msg:"User Saved"})
}