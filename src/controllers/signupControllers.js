const User = require("../models/signupModels");
const bcrypt = require("bcrypt");


const addUserSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // check if email already exists
        const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

       const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(password, saltRounds);

        
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(user);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = addUserSignup;



