Package.describe({
  summary: "Moved to meteor-platform",
  version: '1.0.4-ipc.0'
});

Package.onUse(function (api) {
  api.imply("meteor-platform");
});
