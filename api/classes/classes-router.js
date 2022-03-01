const express = require('express');
const router = express.Router();
const { restricted } = require('./../auth/auth-middleware');
const Classes = require('./classes-model')


router.get('/', async (req, res, next)=>{
    try{
        const classes = await Classes.findAll()
        res.status(200).json(classes)
    }catch(err){
        next(err)
    }
})

router.get('/:class_id', async (req, res, next)=>{
    try{
        const classes = await Classes.findById(req.params.class_id)
        res.status(200).json(classes)
    }catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next)=>{
    try{
        const newClassesId = await Classes.add(req.body)
        res.status(200).json(newClassesId)
    }catch(err){
        next(err)
    }
})

router.put('/:class_id', async (req, res, next)=>{
    try{
        const classes = await Classes.update(req.params.class_id, req.body)
        res.status(200).json(classes)
    }catch(err){
        next(err)
    }
})

router.delete('/:class_id', async (req, res, next)=>{
    try{
        const removed = await Classes.remove(req.params.class_id)
        res.status(200).json({message: `${removed} has been deleted successfully`})
    }catch(err){
        next(err)
    }
});

module.exports = router;