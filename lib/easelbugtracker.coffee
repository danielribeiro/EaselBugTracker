global = window
DisplayObject.suppressCrossDomainErrors = true
rgb = (r, g, b, a) -> Graphics.getRGB r, g, b, a

patch Number,
    mod: (arg) ->
        return @ % arg if @ >= 0
        return (@ + arg) % arg

    times: (fn) ->
        i = @
        fn() while i-- > 0

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


class Dashboard
    constructor: (@stage, @canvas, image) ->
        @composite = new Container
        cur = 0
        5.times =>
            b = new Bitmap(image)
            @composite.addChild b
            b.y = image.height * cur
            cur++
        @composite.pos(240, 180)
        @stage.addChild @composite

    rotateLeft: -> @composite.rotation -= 15

    rotateRight: -> @composite.rotation += 15

    tick: -> @stage.update()

getCanvas = (name) ->
    c = $('#' + name)
    return c[0]

class Img
    constructor: (@ctx, @image, @x, @y) ->

    draw: ->
        #@ctx.fillRect(@x, @y, @image.height, @image.width)
        @ctx.drawImage(@image, @x, @y)

    animate: ->
        @draw()
        @move()


doApp = (image) ->
    canvas = getCanvas 'canvas'
    dash = new Dashboard(new Stage(canvas), canvas, image)
    $(document).bind 'keydown', 'left', -> dash.rotateLeft()
    $(document).bind 'keydown', 'right', -> dash.rotateRight()
    Ticker.setInterval(64)
    Ticker.addListener(dash)
    ctx = $('#canvas')[0].getContext("2d")
    ctx.fillStyle = "rgba(0, 0, 125, .7)"

doApp2 = (image) ->
    canvas = getCanvas 'canvas'
    ctx = canvas.getContext("2d")
    ctx.fillStyle = "rgb(200, 0, 0)"
    ctx.strokeStyle = "rgb(0, 200, 0)"
    ctx.lineWidth = 4
    b1 = new Img(ctx, image, -16, -16)
    b2 = new Img(ctx, image, -16, 0)
    deg = 0
    anim = ->
        deg += 0.016
        ctx.clearRect(0,0,300,300)
        ctx.save()
        ctx.translate(150, 150)
        ctx.rotate(deg)
        b1.draw()
        b2.draw()
        ctx.restore()

    setInterval anim, 10


init_web_app = ->
    img = new Image()
    img.onload = -> doApp img
    #img.src = 'rope.png'
    img.src = 'https://github.com/danielribeiro/EaselBugTracker/raw/master/public/rope.png'

