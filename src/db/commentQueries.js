const prisma = require('../config/prismaClient')


const getAllCommmentsFromPost = async (postId,userId) => {



}

const createComment = async (postId,userId,content) => {

    try {
        
        const comment = await prisma.comment.create({
            data:{
                content : content,
                authorId: userId,
                postId : postId
            }
        })

        return comment

    } catch (error) {
        console.log(error)
    }

}

const updateComment = async (commentId,content) => {

    const updatedComment = await prisma.comment.update({
        where: {
            id : commentId
        },
        data : {
            content : content
        }
    })
    

    return updatedComment
}

const deleteComment = async (commentId) => {

    const deletedComment = await prisma.comment.delete({
        where: {
            id: commentId
        }
    })


    return deletedComment
}



module.exports = {
    getAllCommmentsFromPost,
    createComment,
    updateComment,
    deleteComment
}