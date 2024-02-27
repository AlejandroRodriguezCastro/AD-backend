require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const Recipe = require('../models/recipe.model');
class UserService{
    async getUsers(){
        try{
            const users = await User.find();
            return users;
        } catch(err){
            console.error(err);
            throw new Error('Error al obtener los usuarios');
        }
    }

    async getUserByEmail(email){
        try {
            let user = await User.findOne({email: email});
            return user;
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener el usuario');
        }
    }

    async loginByEmail(user){
        try {
            let userRegistered = await User.findOne({email: user.email});
            if(userRegistered){
                return userRegistered;
            }
            else{
                let newUser = new User(user);
                await newUser.save();
                return newUser;
            }

        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener el usuario');
        }
    }

    async getUserById(id){
        try {
            let user = await User.findById(id);
            return user;
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener el usuario');
        }
    }

    async updateUser(id, user){
        try {
            let updated = await User.findByIdAndUpdate(id, user, {new: true});
            return updated;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al actualizar el usuario');
        }
    }

    async changeUserFavoriteRecipe(id, recipe){
        try {
            let user = await User.findById(id);
            let favoriteRecipes = user.favorite;
            let isFavorite = favoriteRecipes.includes(recipe);
            if(isFavorite){
                user.favorite.pop(recipe);
            }
            else{
                user.favorite.push(recipe);
            }
            await user.save();
            return user;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al actualizar al agregar receta al favorito del usuario');
        }
    }

    async getFavoriteRecipes(id){
        try {
            const user = await User.findById(id);
            const favoriteRecipes = user.favorite;

            let recipes = await Recipe.find({_id: {$in: favoriteRecipes}});
            return recipes;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener las recetas favoritas del usuario');
        }
    }


    async createUser(user){
        try {
            let isUserRegistered = await User.findOne({email: user.email});
            if(isUserRegistered){
                throw new Error('El usuario ya existe');
            }
            else{
                let newUser = new User(user);
                newUser.password = await bcrypt.hashSync(user.password, parseInt(process.env.SALT_ROUNDS) | 10);
                await newUser.save();
                return newUser;
            }
        } catch (err) {
            console.error(err);
            throw new Error('Error al crear el usuario');
        }
    }

    async getUserByEmail(email){
        try {
            let user = await User.findOne({email: email});
            console.log("getUserByEmail");
            console.log(user);
            return user;
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener el usuario con email');
        }
    }
}

module.exports = new UserService();