const prisma = require('../config/prismaClient')


const getAllPosts = async (comments) => {
    
    const posts = await (comments ? 
        prisma.post.findMany({include : {comments : true}}) :
            prisma.posts.findMany({}))

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
            userId : userId,
            published: publish
        }
    })

    return post


}
const updatePost = async (id,title,content) =>{

    const post = await prisma.post.update({
        where: {
            id : id
        },
        data : {
            title : title,
            content : content
        }
    })

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