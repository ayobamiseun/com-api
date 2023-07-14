const express = require('express')
const Item = require('../models/item')


const createItem = async(req,res) => {
     const item = await Item.create(req.body)
     if(!item) {
        res.status(500).json()
     }
     return res.status(201).json({item})
}

module.exports = {createItem}