const prisma = require('../config/prismaClient')


const getAllPosts = async () => {
    
    const posts = await prisma.post.findMany()

    return posts
}


const getPostById = async (id) => {

    const post = await prisma.post.findUnique({
        where : {
            id : id
        },
        include : {
            comments : true
        } 
    })
    

    return post
}

const createPost =  async (title, content, userId, publish) => {
    
    const post = await prisma.post.create({
        data : {
            title : title,
            content : content,
            authorId : userId,
            published: publish
        }
    })

    return post


}
const updatePost = async (id,title,content,publish) =>{

    const post = await prisma.post.update({
        where: {
            id : id
        },
        data : {
            title : title,
            content : content,
            // & TO CHANGE DATATYPE IN CONTROLLER
            published : new Boolean(publish).valueOf()
        }
    })

    return post
}

const deletePost = async (id) => {

    const deletedPost  = await prisma.post.delete({
        where : {
            id : id
        }
    })

    return deletedPost

}




module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}