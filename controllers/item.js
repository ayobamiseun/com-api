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
   const item  = await Item.find({ price: { $gt: 10 } })
   .sort('price')
   .select('name price');
   res.status(200).json({item})
}

//filter items 

const filterItems = async (req, res) => {
   const {name, price, category} = req.query
   const itemQuery = {};

   if(name) {
      itemQuery.name = { $regex: name, $options: 'i' };
   }                      

   let result =  Item.find(itemQuery)

   if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    } else {
      result = result.sort('createdAt');
    }
    
    if (fields) {
      const fieldsList = fields.split(',').join(' ');
      result = result.select(fieldsList);
    }

    const items = await result;
    res.status(200).json({items, nbHits: items.length})


   res.status(200).json({result})
}

module.exports = {createItem, getItem,filterItems}