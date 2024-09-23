
const prisma = require('../config/prismaClient')

const createUser = ({username,email,password,role}) =>{

    const user = prisma.user.create({
        data : {
            username: username,
            email: email,
            password: password,
            role: role
        }
    })

    return user
}       


const findUserById = (id) =>{
    
    const user = prisma.user.findUnique({
        where:{id}
    })

    return user

}

const findUserByUsername = (username) => {

    const user  = prisma.user.findUnique({
        where: {
            username : username
        }
    })


    return user
}




module.exports = {
    createUser,
    findUserById,
    findUserByUsername
}