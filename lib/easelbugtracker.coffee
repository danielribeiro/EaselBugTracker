global = window
DisplayObject.suppressCrossDomainErrors = true
corr = (scale, w) -> (scale - 1)* (w / 2)
rgb = (r, g, b, a) -> Graphics.getRGB r, g, b, a

_setPos = (args...) ->
    return [@x, @y] if args.length == 0
    return @pos(args[0]...) if args.length == 1
    @x = args[0]
    @y = args[1]
    return @

patch DisplayObject, pos: _setPos

patch Point, pos: _setPos

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
    constructor: (@stage, @canvas, image) ->
        img = new XBitmap(image, 1.5).pos 500, 200
        [ox, oy] = img.topLeft()
        b1 = box(ox, oy, img.width(), img.height())
        @add img
        w = img.width()
        h = img.height()
        b2 = box(img.x, img.y, w, h, rgb 0, 127, 0, .5)
        nx = ox - corr(img.scale, w)
        ny = oy - corr(img.scale, h)
        b3 = box(nx,  ny, w, h, rgb 0, 0, 127, .5)
        img.focusBox()
        @add b1, b2, b3

    tick: -> @stage.update()

    add: (args...) -> @addAll args

    addAll: (array) ->
        for arg in array
            @stage.addChild arg
        return

getCanvas = ->
    c = $('#canvas')
    global.W = c.width()
    global.H = c.height()
    return c[0]

doApp = (images) ->
    canvas = getCanvas()
    stage = new Stage(canvas)
    dash = new Dashboard(stage, canvas, images)
    $(document).bind 'keydown', 'left', -> alert 'left'
    $(document).bind 'keydown', 'right', -> alert 'right'
    Ticker.setInterval(64)
    Ticker.addListener(dash)

init_web_app = ->
    img = new Image()
    img.onload = -> doApp img
    img.src = 'github.png'

