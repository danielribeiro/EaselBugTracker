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
        offset = 0
        5.times =>
            b = new Bitmap(image)
            @composite.addChild b
            b.y = offset
            offset += image.height
        @composite.pos(240, 180)
        @stage.addChild @composite

    rotateLeft: -> @composite.rotation -= 15

    rotateRight: -> @composite.rotation += 15

    tick: -> @stage.update()

class DashboardFixxed extends Dashboard
    buildImage: (image, scale) -> new FixedXBitmap(image, scale).pos 200, 200

getCanvas = (name) ->
    c = $('#' + name)
    return c[0]

doApp = (image) ->
    canvas = getCanvas 'canvas'
    dash = new Dashboard(new Stage(canvas), canvas, image)
    $(document).bind 'keydown', 'left', -> dash.rotateLeft()
    $(document).bind 'keydown', 'right', -> dash.rotateRight()
    Ticker.setInterval(64)
    Ticker.addListener(dash)

init_web_app = ->
    img = new Image()
    img.onload = -> doApp img
    # img.src = 'rope.png'
    img.src = 'https://github.com/danielribeiro/EaselBugTracker/raw/master/public/rope.png'

