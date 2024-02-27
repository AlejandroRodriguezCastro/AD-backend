require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const axios = require("axios");

class AuthService {
    async hasValidCredentials(email, password) {
        try {
            const user = await User.findOne({ email });
            console.log(user);
            console.log(await bcrypt.compare(password, user.password));
            if (user && await bcrypt.compare(password, user.password)) {
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            throw new Error("Error al validar credenciales");
        }
    }

    async getTokenInfo(token) {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
            );
            return response.data;
        } catch (err) {
            console.error(err);
            throw new Error("Error al obtener información del token");
        }
    }

    async login(id_token) {      
        try {
            const tokenInfo = await this.getTokenInfo(id_token);
            const user = await User.findOne({ email:
                tokenInfo.email });
            if (user) {
                return user;
            }
            const newUser = new User({
                name: tokenInfo.name,
                email: tokenInfo.email,
                first_name: tokenInfo.given_name,
                family_name: tokenInfo.family_name,
                given_name: tokenInfo.given_name,
                picture: tokenInfo.picture,
            });
            await newUser.save();
            return newUser;
        } catch (err) {
            console.error(err);
            throw new Error("Error al iniciar sesión");
        }
    }
}

module.exports = new AuthService();
