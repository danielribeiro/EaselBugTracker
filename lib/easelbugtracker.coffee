global = window
DisplayObject.suppressCrossDomainErrors = true
corr = (scale, w) -> (scale - 1)* (w / 2)
rgb = (r, g, b, a) -> Graphics.getRGB r, g, b, a


EnhancedDisplayObjectMixin =
    pos: (args...) ->
        return @pos(args[0]...) if args.length == 1
        @x = args[0]
        @y = args[1]
        return @


    dimensions: (args...) ->
        return @pos(args[0]...) if args.length == 1
        @width = args[0]
        @height = args[1]
        return @

mixin DisplayObject, EnhancedDisplayObjectMixin



class XBitmap extends Bitmap
    constructor: (image, scale)->
        super(image)
        @scale = scale or 1
        @setImage image
        @scaleX = @scaleY = @scale

    setImage: (image) ->
        @image = image
        @regX = @getWidth() / 2
        @regY = @getHeight() / 2

    topLeft: -> [@x - @regX, @y - @regY]

    getHeight: -> @image.height * @scale

    getWidth: -> @image.width * @scale

box = (x, y, w, h, color) ->
    color or= rgb 127, 0, 0, .5
    ret = new Shape new Graphics().
        beginFill(color).
        drawRect(x, y, w, h)


class Dashboard
    constructor: (@stage, @canvas, image, scale) ->
        img = @buildImage(image, scale)
        [ox, oy] = img.topLeft()
        w = img.getWidth()
        h = img.getHeight()

        @boundingBox = box(ox, oy, img.getWidth(), img.getHeight())
        @ifRegWas0 = box(img.x, img.y, w, h, rgb 0, 127, 0, .5)
        nx = ox - corr(img.scale, w)
        ny = oy - corr(img.scale, h)
        @obscureCorrection = box(nx,  ny, w, h, rgb 0, 0, 127, .5)
        @img = img
        @add @img
        @add @boundingBox, @ifRegWas0, @obscureCorrection

    buildImage: (image, scale) -> new XBitmap(image, scale).pos 200, 200

    add: (args...) -> @addAll args

    addAll: (array) ->
        for arg in array
            @stage.addChild arg
        return

    rotateLeft: -> @img.rotation -= 15

    rotateRight: -> @img.rotation += 15

    update: -> @stage.update()


class SimpleRectangleDashboard extends Dashboard
    buildImage: (image, scale) ->
        box(200, 200, image.width * scale, image.height * scale, rgb 0, 0, 0)

getCanvas = (name) ->
    c = $('#' + name)
    return c[0]


drawAt = (canvasName, image, scale) ->
    canvas = getCanvas canvasName
    new Dashboard(new Stage(canvas), canvas, image, scale)


doApp = (image) ->
    dashes = []
    dashes.push drawAt('noscale', image, 1)
    dashes.push drawAt('scale15', image, 1.5)
    $(document).bind 'keydown', 'left', ->
        dash.rotateLeft() for dash in dashes
        return
    $(document).bind 'keydown', 'right', ->
        dash.rotateRight() for dash in dashes
        return
    ticker = tick: ->
        dash.update() for dash in dashes
        return
    Ticker.setInterval(64)
    Ticker.addListener(ticker)

init_web_app = ->
    img = new Image()
    img.onload = -> doApp img
    img.src = 'https://github.com/danielribeiro/EaselBugTracker/raw/master/public/github.png'

