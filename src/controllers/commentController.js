const commentQueries = require('../db/commentQueries')

const createComment = async (req,res) => {

    const {content} = req.body


    try {

        const comment = await commentQueries.createComment(parseInt(req.params.postId),1,content)

        return res.status(200).json({
            msg: "Successfully commented",
            comment: comment
        })
        
    } catch (error) {
        console.log(error)
    }


}


const updateComment = async (req,res) => {


    const {content} =  req.body


    try {
        
        const updatedComment = await commentQueries.updateComment(parseInt(req.params.commentId,),content)

        return res.status(200).json({
            msg : "Comment updated",
            comment : updatedComment
        })

    } catch (error) {
        
        console.log(error)
        return res.status(500).json("Something went wrong")
    }

}

const deleteComment = async (req,res) => {


    try {

        const deletedComment = await commentQueries.deleteComment(parseInt(req.params.commentId))

        return res.status(200).json({msg : "Succesfully deleted comment", comment : deletedComment})

        
    } catch (error) {
        return res.status(500).json({
            msg : "Something went wrong"
        })
    }

}

module.exports = {
    createComment,
    updateComment,
    deleteComment
}