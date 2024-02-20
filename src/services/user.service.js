require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
 
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

    async deleteUserFavoriteRecipe(id, recipe){
        try {
            let user = await User.findById(id);
            let favoriteRecipes = user.favorite;
            let isFavorite = favoriteRecipes.includes(recipe);
            if(!isFavorite){
                throw new Error('La receta no se encuentra en favoritos');
            }
            user.favorite.pop(recipe);
            await user.save();
            return user;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al actualizar al agregar receta al favorito del usuario');
        }
    }

    async setUserFavoriteRecipe(id, recipe){
        try {
            let user = await User.findById(id);
            let favoriteRecipes = user.favorite;
            let isFavorite = favoriteRecipes.includes(recipe);
            if(isFavorite){
                throw new Error('La receta ya se encuentra en favoritos');
            }
            user.favorite.push(recipe);
            await user.save();
            return user;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al actualizar al agregar receta al favorito del usuario');
        }
    }

    // get recipes from favorite recipes
    async getFavoriteRecipes(id){
        try {
            let userRecipes = await User.findById(id).populate('recipes');
            if (!user) {
                throw new Error('User not found');
            }
            return userRecipes.recipes;
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener las recetas favoritas');
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