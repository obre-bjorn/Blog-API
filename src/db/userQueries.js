
const prisma = require('../config/prismaClient')

const createUser = async ({username,email,password,role}) =>{

    const user = await prisma.user.create({
        data : {
            username: username,
            email: email,
            password: password,
            role: role
        }
    })

    return user
}


const findUserById = async (id) =>{

    const user = await prisma.user.findUnique({
        where:{id}
    })

    return user

}

const findUserByUsername = async (username) => {

    const user  = await prisma.user.findUnique({
        where: {
            username : username
        }
    })


    return user
}

const getAllUsers =  async () => {

  const users = await prisma.user.findMany()

  return users

}

const updateUser = async (userId,role) => {


  const updatedUser = await prisma.user.update({
    where : {
      id : userId
    },
    data: {
      role:role
    }

  })

  return updatedUser
 }

const deleteUser = async (userId) => {

  const deletedUser = await prisma.user.delete({
    where : {
      id : {id}
    }
  })

  return deletedUser
}




module.exports = {
    deleteUser,
    updateUser,
    getAllUsers,
    createUser,
    findUserById,
    findUserByUsername
}
