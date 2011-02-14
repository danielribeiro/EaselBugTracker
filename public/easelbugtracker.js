(function() {
  var Dashboard, EnhancedDisplayObjectMixin, SimpleRectangleDashboard, XBitmap, box, corr, doApp, drawAt, getCanvas, global, init_web_app, rgb;
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
  EnhancedDisplayObjectMixin = {
    pos: function() {
      var args;
      args = __slice.call(arguments, 0);
      if (args.length === 1) {
        return this.pos.apply(this, args[0]);
      }
      this.x = args[0];
      this.y = args[1];
      return this;
    },
    dimensions: function() {
      var args;
      args = __slice.call(arguments, 0);
      if (args.length === 1) {
        return this.pos.apply(this, args[0]);
      }
      this.width = args[0];
      this.height = args[1];
      return this;
    }
  };
  mixin(DisplayObject, EnhancedDisplayObjectMixin);
  XBitmap = function(image, scale) {
    XBitmap.__super__.constructor.call(this, image);
    this.scale = scale || 1;
    this.setImage(image);
    this.scaleX = (this.scaleY = this.scale);
    return this;
  };
  __extends(XBitmap, Bitmap);
  XBitmap.prototype.setImage = function(image) {
    this.image = image;
    this.regX = this.getWidth() / 2;
    return (this.regY = this.getHeight() / 2);
  };
  XBitmap.prototype.topLeft = function() {
    return [this.x - this.regX, this.y - this.regY];
  };
  XBitmap.prototype.getHeight = function() {
    return this.image.height * this.scale;
  };
  XBitmap.prototype.getWidth = function() {
    return this.image.width * this.scale;
  };
  box = function(x, y, w, h, color) {
    var ret;
    color || (color = rgb(127, 0, 0, .5));
    return (ret = new Shape(new Graphics().beginFill(color).drawRect(x, y, w, h)));
  };
  Dashboard = function(_arg, _arg2, image, scale) {
    var _ref, h, img, nx, ny, ox, oy, w;
    this.canvas = _arg2;
    this.stage = _arg;
    img = this.buildImage(image, scale);
    _ref = img.topLeft();
    ox = _ref[0];
    oy = _ref[1];
    w = img.getWidth();
    h = img.getHeight();
    this.boundingBox = box(ox, oy, img.getWidth(), img.getHeight());
    this.ifRegWas0 = box(img.x, img.y, w, h, rgb(0, 127, 0, .5));
    nx = ox - corr(img.scale, w);
    ny = oy - corr(img.scale, h);
    this.obscureCorrection = box(nx, ny, w, h, rgb(0, 0, 127, .5));
    this.img = img;
    this.add(this.img);
    this.add(this.boundingBox, this.ifRegWas0, this.obscureCorrection);
    return this;
  };
  Dashboard.prototype.buildImage = function(image, scale) {
    return new XBitmap(image, scale).pos(200, 200);
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
  Dashboard.prototype.rotateLeft = function() {
    return this.img.rotation -= 15;
  };
  Dashboard.prototype.rotateRight = function() {
    return this.img.rotation += 15;
  };
  Dashboard.prototype.update = function() {
    return this.stage.update();
  };
  SimpleRectangleDashboard = function() {
    return Dashboard.apply(this, arguments);
  };
  __extends(SimpleRectangleDashboard, Dashboard);
  SimpleRectangleDashboard.prototype.buildImage = function(image, scale) {
    return box(200, 200, image.width * scale, image.height * scale, rgb(0, 0, 0));
  };
  getCanvas = function(name) {
    var c;
    c = $('#' + name);
    return c[0];
  };
  drawAt = function(canvasName, image, scale) {
    var canvas;
    canvas = getCanvas(canvasName);
    return new Dashboard(new Stage(canvas), canvas, image, scale);
  };
  doApp = function(image) {
    var dashes, ticker;
    dashes = [];
    dashes.push(drawAt('noscale', image, 1));
    dashes.push(drawAt('scale15', image, 1.5));
    $(document).bind('keydown', 'left', function() {
      var _i, _len, _ref, dash;
      _ref = dashes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dash = _ref[_i];
        dash.rotateLeft();
      }
      return null;
    });
    $(document).bind('keydown', 'right', function() {
      var _i, _len, _ref, dash;
      _ref = dashes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dash = _ref[_i];
        dash.rotateRight();
      }
      return null;
    });
    ticker = {
      tick: function() {
        var _i, _len, _ref, dash;
        _ref = dashes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          dash = _ref[_i];
          dash.update();
        }
        return null;
      }
    };
    Ticker.setInterval(64);
    return Ticker.addListener(ticker);
  };
  init_web_app = function() {
    var img;
    img = new Image();
    img.onload = function() {
      return doApp(img);
    };
    return (img.src = 'https://github.com/danielribeiro/EaselBugTracker/raw/master/public/github.png');
  };
window.Dashboard = Dashboard
window.EnhancedDisplayObjectMixin = EnhancedDisplayObjectMixin
window.SimpleRectangleDashboard = SimpleRectangleDashboard
window.XBitmap = XBitmap
window.box = box
window.corr = corr
window.doApp = doApp
window.drawAt = drawAt
window.getCanvas = getCanvas
window.global = global
window.init_web_app = init_web_app
window.rgb = rgb
}).call(this);
