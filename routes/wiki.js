const express = require('express');
const router = require('express').Router();
const wikipage = require('../views/main');
const addPage = require('../views/addPage')
const { Page } = require("../models");



router.get('/', (req,res,next)=> {

  res.redirect('/wiki')
})

router.post('/', async (req,res,next)=> {


  // let titleSlug = req.body.title.replace(/\s/g,"_").replace(/\W/g, '');
  // titleVar.replace(/\s/g,"_")




  const page = new Page({
    title: req.body.title,
    content: 'i am test string'

  });
      console.log('page', page.slug)

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }

  res.send()
})




router.get('/add', (req,res,next)=> {

  res.send(addPage())
})

module.exports = router
