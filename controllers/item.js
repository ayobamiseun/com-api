const express = require('express')
const Item = require('../models/item')


const createItem = async(req,res) => {
     const item = await Item.create(req.body)
     if(!item) {
        res.status(500).json()
     }
     return res.status(201).json({item})
}

const getItem = async (req, res) => {
   const item  = await Item.find({})
   res.status(200).json({item})
}

//filter items 

const filterItems = async (req, res) => {
   const {name, price, category} = req.query
   const itemQuery = {}

   if(name) {
      itemQuery.name =  {$regrex: name, $otions: 'i'}
   }

   let result = await Item.find(itemQuery)
   res.status(200).json({item})
}

module.exports = {createItem, getItem,filterItems}