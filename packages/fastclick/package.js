Package.describe({
  summary: "Faster touch events on mobile",
  version: '1.0.2-rc.1'
});

Package.onUse(function (api) {
  api.export('FastClick', 'web');

  api.addFiles(['pre.js', 'fastclick.js', 'post.js'], 'web');
});
