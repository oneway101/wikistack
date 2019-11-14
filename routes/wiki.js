const express = require('express');
const router = require('express').Router();
const { wikipage } = require('../views');
const { addPage } = require('../views')
const { main } = require('../views');
const { Page } = require("../models");



router.get('/', async (req,res,next) => {
  const allPages = await Page.findAll({attributes:['pages']})
  //res.json(allPages)
  res.send(main(allPages))
  res.redirect('/wiki')
})

router.post('/', async (req,res,next) => {

  const page = new Page({
    title: req.body.title,
    content: 'i am test string'
  });

  try {
    await page.save();
    res.redirect(`/${page.slug}`);
  } catch (error) { next(error) }
})

router.get('/add', (req,res,next)=> {

  res.send(addPage())

})

router.get('/:slug', async (req, res, next) => {

  try {
    const page = await Page.findOne({
      where: {slug: req.params.slug }
    })

    res.json(page)
  } catch (error) { next(error) }


  res.send(wikipage(page,author))

});

module.exports = router
