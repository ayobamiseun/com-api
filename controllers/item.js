const express = require("express");
const Item = require("../models/item");

const createItem = async (req, res) => {
  const item = await Item.create(req.body);
  if (!item) {
    res.status(500).json();
  }
  return res.status(201).json({ item });
};

const getItem = async (req, res) => {
  const item = await Item.find({ price: { $gt: 10 } })
    .sort("price")
    .select("name price");
  res.status(200).json({ item });
};

//filter items

const filterItems = async (req, res) => {
  const { name, category,  description, sort, fields } = req.query;
  const itemQuery = {};

  if (name) {
    itemQuery.name = { $regex: name, $options: "i" };
  }

  if (description) {
   queryObject.featured = description === "true" ? true : false;
 }
 if (category) {
   queryObject.category = category;
 }

 if(numericFilters) {
   const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
   };
   const regEx = /\b(<|>|>=|=|<|<=)\b/g;
   let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const option = ['price'];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });

 }

  let result = Item.find(itemQuery);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const items = await result;
  res.status(200).json({ items, nbHits: items.length });
   
  res.status(200).json({ result });
};

module.exports = { createItem, getItem, filterItems };
