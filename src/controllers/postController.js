const postQueries = require('../db/postQueries')


const getAllPosts = async (req,res) => {

    try {
        const posts = await postQueries.getAllPosts()

        return res.status(200).json({
            msg: "Success",
            posts : posts
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Internal server error"})

    }


}



const getPostById = async (req,res) =>{

    const post = await postQueries.getPostById(parseInt(req.params.id))

    return res.status(200).json({
        msg : "Success",
        post : post
    })

}

const createNewPost = async (req,res) => {

    const {title,content,publish} = req.body


    try {

        const post = await postQueries.createPost(title,content,req.user.id, new Boolean(publish).valueOf())


        return res.status(200).json({
            msg: "Succesfully created post",
            post: post
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Something went wrong"
        })
    }


}

const updatePost = async (req,res) => {

    const {title, content,publish} = req.body

    const updatedPost = await postQueries.updatePost(parseInt(req.params.id),title,content,publish)

    return res.status(200).json({
        msg : "Successfully updated post",
        post: updatedPost
    })
}

const deletePost = async (req,res) =>{

    const id = parseInt(req.params.id)

    const deletedPost = await postQueries.deletePost(id)

    return res.status(200).json({
        msg: "Successfully deleted a post",
        post : deletedPost
    })
}



module.exports = {
    getAllPosts,
    getPostById,
    createNewPost,
    updatePost,
    deletePost
}
