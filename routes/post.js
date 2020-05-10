const express = require('express');
const router = express.Router();



// http://localhost:8080/api/post GET
router.get('', (req, res) => {
    const posts =  Post.find({})
    res.status(200).json(posts)
})
// http://localhost:8080/api/post POST --отправляем данные в базу
router.post('', (req, res) => {
	const postData = {
		title: req.body.title,
		text: req.body.text,
    }
    const post = new Post(postData)
    //выполнитьсяя после сохранения
    post.save()  
    res.status(201).json(post)
})
// http://localhost:8080/api/post DELETE
router.delete('', (req, res) => {
	
})



module.exports = router;