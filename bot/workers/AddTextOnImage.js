const { createCanvas, Image } = require('canvas')
const paths = require('../constants/paths')
const sha1 = require('sha1')
const path = require('path')
const fs = require('fs')

class AddTextOnImage {
  constructor (text) {
    this.text = text
    this.lines = []
    this.textByWords = []
    this.img = null
    this.ctx = null
    this.canvas = null
    this.fontSize = 12
    this.lineHeight = 1.3
    this.font = 'Fira Sans'
    this.startProcessAddText()
    this.maxLengthLineTextPx = 275
    this.objectsByLineForPrint = []
    this.pathToTemplate = this.getPath(paths.pathToTemplateCookieImage)
    this.pathToSave = this.getPath(paths.pathToSaveUpgradedCookieImage)
  }

  getPath (route) {
    return path.resolve() + route
  }

  startProcessAddText () {
    this.readeTemplate()
    this.initImage()
    this.initCanvas()
    this.splitTextByWords()
    this.createLines()
    this.preparationObjectForPrint()
    this.addTextInCtx()
    this.createNameForImage()
    this.saveUpdatedImage()
  }

  readeTemplate () {
    this.contentTemplate = fs.readFileSync(this.pathToTemplate)
  }

  initImage () {
    this.img = new Image()
    this.img.src = this.contentTemplate
  }

  initCanvas () {
    this.canvas = createCanvas(this.img.width, this.img.height)
    this.ctx = this.canvas.getContext('2d')
    this.ctx.font = `italic small-caps ${this.fontSize}px ${this.font}`
    this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height)
    this.ctx.fillStyle = 'rgb(0,0,0)'
  }

  splitTextByWords () {
    this.textByWords = this.text.split(' ')
  }

  createLines () {
    this.textByWords.reduce(this.reduceFuncForCreateLines.bind(this))
  }

  reduceFuncForCreateLines (accumulator, currentValue, index, source) {
    const updatedAccumulator = accumulator + ' ' + currentValue

    if (this.ctx.measureText(updatedAccumulator).width > this.maxLengthLineTextPx) {
      this.lines.push(accumulator)
      if (index === source.length - 1) {
        this.lines.push(currentValue)
        return ''
      }
      return currentValue
    } else {
      if (index === source.length - 1) {
        this.lines.push(updatedAccumulator)
        return ''
      }
    }

    return updatedAccumulator
  }

  preparationObjectForPrint () {
    const x = 165; let y = 79
    const stepLine = this.fontSize * this.lineHeight

    y -= stepLine * (this.lines.length - 1) / 2

    this.lines.forEach(elem => {
      this.objectsByLineForPrint.push({ position: { x: x, y: y }, text: elem })
      y += stepLine
    })
  }

  addTextInCtx () {
    this.objectsByLineForPrint.forEach(elem => {
      this.ctx.fillText(elem.text, elem.position.x, elem.position.y)
    })
  }

  createNameForImage () {
    this.newNameImage = sha1(this.text + String(new Date().getTime())) + '.png'
  }

  saveUpdatedImage () {
    fs.writeFileSync(`${this.pathToSave}/${this.newNameImage}`, this.canvas.toBuffer())
  }

  get pathToPicture () {
    return `${this.pathToSave}/${this.newNameImage}`
  }
}

module.exports = AddTextOnImage
