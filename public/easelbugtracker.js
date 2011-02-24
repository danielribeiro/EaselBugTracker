(function() {
  var Dashboard, DashboardFixxed, EnhancedDisplayObjectMixin, doApp, getCanvas, global, init_web_app, rgb;
  var __slice = Array.prototype.slice, __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
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
    var offset;
    this.canvas = _arg2;
    this.stage = _arg;
    this.composite = new Container();
    offset = 0;
    (5).times(__bind(function() {
      var b;
      b = new Bitmap(image);
      this.composite.addChild(b);
      b.y = offset;
      return offset += image.height;
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
  DashboardFixxed = function() {
    return Dashboard.apply(this, arguments);
  };
  __extends(DashboardFixxed, Dashboard);
  DashboardFixxed.prototype.buildImage = function(image, scale) {
    return new FixedXBitmap(image, scale).pos(200, 200);
  };
  getCanvas = function(name) {
    var c;
    c = $('#' + name);
    return c[0];
  };
  doApp = function(image) {
    var canvas, dash;
    canvas = getCanvas('canvas');
    dash = new Dashboard(new Stage(canvas), canvas, image);
    $(document).bind('keydown', 'left', function() {
      return dash.rotateLeft();
    });
    $(document).bind('keydown', 'right', function() {
      return dash.rotateRight();
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
    return (img.src = 'https://github.com/danielribeiro/EaselBugTracker/raw/master/public/rope.png');
  };
window.Dashboard = Dashboard
window.DashboardFixxed = DashboardFixxed
window.EnhancedDisplayObjectMixin = EnhancedDisplayObjectMixin
window.doApp = doApp
window.getCanvas = getCanvas
window.global = global
window.init_web_app = init_web_app
window.rgb = rgb
}).call(this);
