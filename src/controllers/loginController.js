const User = require("../models/signupModels");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "User Already Exist" });
        }

        // check if password matches
        if (user.password !== password) {
            return res.status(400).json({ error: "Passwoerd doesn't Match" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = loginUser;