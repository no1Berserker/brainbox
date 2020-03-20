const generic = require("./filesystem")
const path = require('path')
const fs = require('fs-extra')
const express = require('express')
const shortid = require('shortid')
const colors = require('colors')

// Storage backend for the personal usage
//
module.exports = {
  // the permissions are exposed to the UI. The UI can enable/disable features regarding
  // to the settings
  permissions: {
    authentication:{
      enabled: false
    },
    updates:{
      update: false,
      list: false
    },
    brains:{
      create: true,
      update: false,
      delete: false,
      read: true,
      list: false,
      demos: true
    },
    shapes:{
      create: false,
      update: false,
      delete: false,
      read: true,
      list: false
    }
  },

  init: function(app, args){
    const brainsHomeDir   = args.folder + "brains_hosted/"
    const shapeAppDir     = path.normalize(__dirname + '/../../shapes/')
    const brainsAppDir    = path.normalize(__dirname + '/../../brains/')

    // Ensure that the required storage folder exists
    //
    if (!fs.existsSync(args.folder)) {
      fs.mkdirSync(args.folder)
    }
    if (!fs.existsSync(brainsHomeDir)) {
      fs.mkdirSync(brainsHomeDir)
    }

    console.log("| You are using the "+"'hosted'".bold.green+" file storage engine.                          |")
    console.log("| This kind of installation is perfect for public access. It works by      |")
    console.log("| allowing "+"anyone".bold+" to create “circuits” and save them without user/pwd.     |")
    console.log("| You can then display those circuits on your profile, take feedback, and  |")
    console.log("| continue to edit those circuits at any time. Each save operation creates |")
    console.log("| a new file and access URL. It is not possible to change a file, the      |")
    console.log("| System creates always a new one. It works like https://codepen.io        |")
    console.log("|                                                                          |")
    console.log("| "+"File Location:".bold+"                                                           |")
    console.log("|    "+brainsHomeDir)
    // =================================================================
    // Handle brain files
    //
    // =================================================================
    // app.get('/backend/brain/list',    (req, res) => module.exports.listFiles(brainsHomeDir,      req.query.path, res))
    app.get('/backend/brain/get',     (req, res) => module.exports.getJSONFile(brainsHomeDir,    req.query.filePath, res))
    app.get('/backend/brain/image',   (req, res) => module.exports.getBase64Image(brainsHomeDir, req.query.filePath, res))
    // not supported in the hosted version. We just create new files on every save....like Codepen
    // app.post('/backend/brain/delete', (req, res) => module.exports.deleteFile(brainsHomeDir,     req.body.filePath, res))
    // app.post('/backend/brain/rename', (req, res) => module.exports.renameFile(brainsHomeDir,     req.body.from, req.body.to, res))
    app.post('/backend/brain/save',   (req, res) => module.exports.writeBrain(brainsHomeDir,      req.body.filePath, req.body.content, res))


    // =================================================================
    // Handle EXAMPLE brain files
    //
    // =================================================================
    app.get('/backend/demo/list',  (req, res) => module.exports.listFiles(brainsAppDir, req.query.path, res))
    app.get('/backend/demo/get',   (req, res) => module.exports.getJSONFile(brainsAppDir, req.query.filePath, res))
    app.get('/backend/demo/image', (req, res) => module.exports.getBase64Image(brainsAppDir, req.query.filePath, res))


    // =================================================================
    // Handle update files
    //
    // =================================================================
    // app.get('/backend/updates/shapes', (req, res) => update.getLatestShapeRelease(res))
    // app.post('/backend/updates/shapes', async (req, res) => update.upgradeTo(shapeAppDir, req.body.url, res))


    // =================================================================
    // Handle shape files
    //
    // =================================================================
    app.use('/circuit/shapes', express.static(shapeAppDir));
    app.get('/backend/shape/list', (req, res) => module.exports.listFiles(shapeAppDir, req.query.path, res))
    app.get('/backend/shape/get', (req, res) => module.exports.getJSONFile(shapeAppDir, req.query.filePath, res))
    app.get('/backend/shape/image', (req, res) => module.exports.getBase64Image(shapeAppDir, req.query.filePath, res))
    // app.post('/backend/shape/delete', (req, res) => module.exports.deleteFile(shapeAppDir, req.body.filePath, res))
    // app.post('/backend/shape/rename', (req, res) => module.exports.renameFile(shapeAppDir, req.body.from, req.body.to, res))
    // app.post('/backend/shape/save', (req, res) => module.exports.writeShape(shapeAppDir, req.body.filePath, req.body.content, req.body.commitMessage, res))
  },

  listFiles: generic.listFiles,
  getJSONFile: generic.getJSONFile,
  getBase64Image: generic.getBase64Image,
  renameFile: ()=>{},
  deleteFile: ()=>{},
  writeShape: ()=>{},
  writeFile:  ()=>{},

  writeBrain: (baseDir, subDir, content, res ) => {
    // every save of a file ends in a NEW file. Like a codepen page.
    // The new filename is the return value of this call
    //
    generic.writeBrain(baseDir, shortid.generate()+".brain", content, res, (subDir, err)=>{
      res.setHeader('Content-Type', 'application/json')
      res.send({ filePath: subDir })
    })
  }
}
