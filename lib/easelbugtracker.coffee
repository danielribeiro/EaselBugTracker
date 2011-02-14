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


class XBitmap extends Container
    constructor: (image, scale)->
        super()
        @scale = scale or 1
        @addChild new Bitmap(image)
        @setImage image
        @scaleX = @scaleY = @scale

    setImage: (image) ->
        @image = image
        @regX = @width() / 2
        @regY = @height() / 2

    topLeft: -> [@x - @regX, @y - @regY]

    height: -> @image.height * @scale

    width: -> @image.width * @scale

box = (@x, @y, @w, @h, color) ->
    color or= rgb 127, 0, 0, .5
    new Shape new Graphics().
        beginFill(color).
        drawRect(@x, @y, @w, @h)


class Dashboard
    constructor: (@stage, @canvas, image, scale) ->
        img = new XBitmap(image, scale).pos 200, 200
        [ox, oy] = img.topLeft()
        w = img.width()
        h = img.height()

        @boundingBox = box(ox, oy, img.width(), img.height())
        @ifRegWas0 = box(img.x, img.y, w, h, rgb 0, 127, 0, .5)
        nx = ox - corr(img.scale, w)
        ny = oy - corr(img.scale, h)
        @obscureCorrection = box(nx,  ny, w, h, rgb 0, 0, 127, .5)
        @img = img
        @add @img
        @add @boundingBox, @ifRegWas0, @obscureCorrection

    add: (args...) -> @addAll args

    addAll: (array) ->
        for arg in array
            @stage.addChild arg
        return

    rotateLeft: -> @img.rotation -= 15

    rotateRight: -> @img.rotation += 15

    update: -> @stage.update()

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
    img.src = 'github.png'

