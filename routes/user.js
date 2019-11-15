const express = require('express');
const router = require('express').Router();
const { User } = require("../models");



router.get('/', async (req,res,next) => {
  const allPages = await Page.findAll({attributes:['title', 'slug']})
  //res.json(allPages)
  res.send(main(allPages))
  res.redirect('/wiki')
})

router.post('/', async (req,res,next) => {

  try {
    // const page = new Page ({
    //   title: req.body.title,
    //   content: req.body.content
    // });
    const author = await User.findOrCreate({
      where : {
        name : req.body.name,
        email: req.body.email
      }
    })
    const page = await Page.create(req.body)

    //res.json(author)
    page.authorId = author.id;
    //await author.save();
    //await page.save();

    res.redirect(`/wiki/${page.slug}`);
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
    //res.json(page)
    res.send(wikipage(page))
  } catch (error) { next(error) }




});

module.exports = router
