(function() {
  var Dashboard, EnhancedDisplayObjectMixin, Img, doApp, doApp2, getCanvas, global, init_web_app, rgb;
  var __slice = Array.prototype.slice, __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  global = window;
  DisplayObject.suppressCrossDomainErrors = true;
  rgb = function(r, g, b, a) {
    return Graphics.getRGB(r, g, b, a);
  };
  patch(Number, {
    mod: function(arg) {
      if (this >= 0) {
        return this % arg;
      }
      return (this + arg) % arg;
    },
    times: function(fn) {
      var _result, i;
      i = this;
      _result = [];
      while (i-- > 0) {
        _result.push(fn());
      }
      return _result;
    }
  });
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
  Dashboard = function(_arg, _arg2, image) {
    var cur;
    this.canvas = _arg2;
    this.stage = _arg;
    this.composite = new Container();
    cur = 0;
    (5).times(__bind(function() {
      var b;
      b = new Bitmap(image);
      this.composite.addChild(b);
      b.y = image.height * cur;
      return cur++;
    }, this));
    this.composite.pos(240, 180);
    this.stage.addChild(this.composite);
    return this;
  };
  Dashboard.prototype.rotateLeft = function() {
    return this.composite.rotation -= 15;
  };
  Dashboard.prototype.rotateRight = function() {
    return this.composite.rotation += 15;
  };
  Dashboard.prototype.tick = function() {
    return this.stage.update();
  };
  getCanvas = function(name) {
    var c;
    c = $('#' + name);
    return c[0];
  };
  Img = function(_arg, _arg2, _arg3, _arg4) {
    this.y = _arg4;
    this.x = _arg3;
    this.image = _arg2;
    this.ctx = _arg;
    return this;
  };
  Img.prototype.draw = function() {
    return this.ctx.drawImage(this.image, this.x, this.y);
  };
  Img.prototype.animate = function() {
    this.draw();
    return this.move();
  };
  doApp = function(image) {
    var canvas, ctx, dash;
    canvas = getCanvas('canvas');
    dash = new Dashboard(new Stage(canvas), canvas, image);
    $(document).bind('keydown', 'left', function() {
      return dash.rotateLeft();
    });
    $(document).bind('keydown', 'right', function() {
      return dash.rotateRight();
    });
    Ticker.setInterval(64);
    Ticker.addListener(dash);
    ctx = $('#canvas')[0].getContext("2d");
    return (ctx.fillStyle = "rgba(0, 0, 125, .7)");
  };
  doApp2 = function(image) {
    var anim, b1, b2, canvas, ctx, deg;
    canvas = getCanvas('canvas');
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.strokeStyle = "rgb(0, 200, 0)";
    ctx.lineWidth = 4;
    b1 = new Img(ctx, image, -16, -16);
    b2 = new Img(ctx, image, -16, 0);
    deg = 0;
    anim = function() {
      deg += 0.016;
      ctx.clearRect(0, 0, 300, 300);
      ctx.save();
      ctx.translate(150, 150);
      ctx.rotate(deg);
      b1.draw();
      b2.draw();
      return ctx.restore();
    };
    return setInterval(anim, 10);
  };
  init_web_app = function() {
    var img;
    img = new Image();
    img.onload = function() {
      return doApp(img);
    };
    return (img.src = 'https://github.com/danielribeiro/EaselBugTracker/raw/master/public/rope.png');
  };
window.Dashboard = Dashboard
window.EnhancedDisplayObjectMixin = EnhancedDisplayObjectMixin
window.Img = Img
window.doApp = doApp
window.doApp2 = doApp2
window.getCanvas = getCanvas
window.global = global
window.init_web_app = init_web_app
window.rgb = rgb
}).call(this);
