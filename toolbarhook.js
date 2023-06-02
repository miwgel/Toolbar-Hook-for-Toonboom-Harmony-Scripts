/**
 * @file Toolbar Hook for Toonboom Harmony Scripts
 * @copyright miwgel
 * @author miwgel < github.com/miwgel >
 */

/**
 * @param { object } packageInfo Object with information about the current package (from configure.js)
 * @param { QWidget } widget QWidget to be added to the toolbar
 * @param { bool } addBranding Should we add Visual Droids branding to the toolbar?
 * @param { bool } debug Print extra debug messages
 */
function ToolbarHook(packageInfo, widget, addBranding, debug) {
  if (typeof addBranding === "undefined") var addBranding = false;
  if (typeof debug === "undefined") var debug = false;

  this.packageInfo = packageInfo;
  this.debug = debug;

  this.toolbar = this.getToolbar.call(
    this,
    this.packageInfo.packageFullName.replace(/ /g, "_")
  );

  if (addBranding) this.addVisualDroidsBranding();
  this.addElement.call(this, widget);
}

ToolbarHook.prototype.addVisualDroidsBranding = function () {
  this.icon = new QLabel();
  this.icon.setFixedWidth(UiLoader.dpiScale(40));
  this.icon.alignment = Qt.AlignCenter;
  // this.icon.setPixmap(
  //     new QPixmap(this.packageInfo.packageFolder + "/icons/logo.png").scaled(
  //         new QSize(UiLoader.dpiScale(30), UiLoader.dpiScale(30)),
  //         Qt.KeepAspectRatio,
  //         Qt.SmoothTransformation
  //     )
  // );
  this.label = new QLabel(
    "<html>" +
    "<head/>" +
      "<body>" +
      "<p align='left' style='padding:0px; margin:0px; margin-left:10px; margin-right:10px; font:bold large \"Arial\"'>" +
      "<span style=' font-size:15pt;line-height:10px; '>" +
      this.packageInfo.packageShortName +
      "</span>" +
      "</p>" +
      "<p align='left' style='padding:0px; margin:0px; margin-left:10px; margin-right:10px; font:\"Arial\"'>" +
      "<span style=' font-size:8pt; font-weight:400;'>by " +
      this.packageInfo.packageCreator +
      "</span>" +
      "</p>" +
      "</body>" +
      "</html>"
  );
  // this.label.setFixedWidth(UiLoader.dpiScale(100));
  this.label.alignment = Qt.AlignCenter;
  // setIcon(visualdroidsLabel, packageInfo.packageFolder + "/icons/BackdropTool.png");
  // visualdroidsLabel.setPixmap(new QPixmap(packageInfo.packageFolder + "/icons/BackdropTool.png"));
  // visualdroidsLabel = new QIcon(packageInfo.packageFolder + "/icons/BackdropTool.png");
  // this.toolbar.addWidget(this.icon);
  this.addElement.call(this, this.label);
};

ToolbarHook.prototype.addElement = function (widget) {
  this.toolbar.addWidget(widget);
};
ToolbarHook.prototype.getToolbar = function (toolbarName) {
  for (var i = 1; i < QApplication.allWidgets().length; i++) {
    var currentItem = QApplication.allWidgets()[i];
    if (currentItem.objectName == toolbarName) {
      return currentItem;
    }
  }
};

exports.ToolbarHook = ToolbarHook;
