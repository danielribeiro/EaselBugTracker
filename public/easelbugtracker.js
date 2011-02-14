(function() {
  var Dashboard, XBitmap, _setPos, box, corr, doApp, getCanvas, global, init_web_app, rgb;
  var __slice = Array.prototype.slice, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  global = window;
  DisplayObject.suppressCrossDomainErrors = true;
  corr = function(scale, w) {
    return (scale - 1) * (w / 2);
  };
  rgb = function(r, g, b, a) {
    return Graphics.getRGB(r, g, b, a);
  };
  _setPos = function() {
    var args;
    args = __slice.call(arguments, 0);
    if (args.length === 0) {
      return [this.x, this.y];
    }
    if (args.length === 1) {
      return this.pos.apply(this, args[0]);
    }
    this.x = args[0];
    this.y = args[1];
    return this;
  };
  patch(DisplayObject, {
    pos: _setPos
  });
  patch(Point, {
    pos: _setPos
  });
  XBitmap = function(image, scale) {
    XBitmap.__super__.constructor.call(this);
    this.scale = scale || 1;
    this.addChild(new Bitmap(image));
    this.setImage(image);
    this.scaleX = (this.scaleY = this.scale);
    return this;
  };
  __extends(XBitmap, Container);
  XBitmap.prototype.setImage = function(image) {
    this.image = image;
    this.regX = this.width() / 2;
    return (this.regY = this.height() / 2);
  };
  XBitmap.prototype.topLeft = function() {
    return [this.x - this.regX, this.y - this.regY];
  };
  XBitmap.prototype.height = function() {
    return this.image.height * this.scale;
  };
  XBitmap.prototype.width = function() {
    return this.image.width * this.scale;
  };
  box = function(_arg, _arg2, _arg3, _arg4, color) {
    this.h = _arg4;
    this.w = _arg3;
    this.y = _arg2;
    this.x = _arg;
    color || (color = rgb(127, 0, 0, .5));
    return new Shape(new Graphics().beginFill(color).drawRect(this.x, this.y, this.w, this.h));
  };
  Dashboard = function(_arg, _arg2, image) {
    var _ref, b1, b2, b3, h, img, nx, ny, ox, oy, w;
    this.canvas = _arg2;
    this.stage = _arg;
    img = new XBitmap(image, 1.5).pos(500, 200);
    _ref = img.topLeft();
    ox = _ref[0];
    oy = _ref[1];
    b1 = box(ox, oy, img.width(), img.height());
    this.add(img);
    w = img.width();
    h = img.height();
    b2 = box(img.x, img.y, w, h, rgb(0, 127, 0, .5));
    nx = ox - corr(img.scale, w);
    ny = oy - corr(img.scale, h);
    b3 = box(nx, ny, w, h, rgb(0, 0, 127, .5));
    img.focusBox();
    this.add(b1, b2, b3);
    return this;
  };
  Dashboard.prototype.tick = function() {
    return this.stage.update();
  };
  Dashboard.prototype.add = function() {
    var args;
    args = __slice.call(arguments, 0);
    return this.addAll(args);
  };
  Dashboard.prototype.addAll = function(array) {
    var _i, _len, _ref, arg;
    _ref = array;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      arg = _ref[_i];
      this.stage.addChild(arg);
    }
    return null;
  };
  getCanvas = function() {
    var c;
    c = $('#canvas');
    global.W = c.width();
    global.H = c.height();
    return c[0];
  };
  doApp = function(images) {
    var canvas, dash, stage;
    canvas = getCanvas();
    stage = new Stage(canvas);
    dash = new Dashboard(stage, canvas, images);
    $(document).bind('keydown', 'left', function() {
      return alert('left');
    });
    $(document).bind('keydown', 'right', function() {
      return alert('right');
    });
    Ticker.setInterval(64);
    return Ticker.addListener(dash);
  };
  init_web_app = function() {
    var img;
    img = new Image();
    img.onload = function() {
      return doApp(img);
    };
    return (img.src = 'github.png');
  };
window.Dashboard = Dashboard
window.XBitmap = XBitmap
window._setPos = _setPos
window.box = box
window.corr = corr
window.doApp = doApp
window.getCanvas = getCanvas
window.global = global
window.init_web_app = init_web_app
window.rgb = rgb
}).call(this);
