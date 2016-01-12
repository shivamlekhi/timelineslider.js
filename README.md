#Timelime Slider
Timeline Slider is a JQuery Plugin for creating beautiful Sliders based on years. 
<img src="http://i.imgur.com/AhpXPeV.gif" width="100%">

##Including Files
```html
<!-- CSS Style -->
<link rel="stylesheet" type="text/css" href="css/timelineslider.css">

<!-- Adding The JS Magic -->
<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/timelineslider.js"></script> 
```
The Plugin Requires [**Jquery**](http://www.jquery.com)  and [**Jquery UI**](http://jqueryui.com/)
The Demo can be found in _demo.html_

##Simple to Use
```html
<div id="slider"></div>
```
```js

$(document).ready(function () {
	$('#slider').timelineSlider();
});

```

####Options
```js

$(document).ready(function () {
	$('#slider').timelineSlider({
		range: [2000, 2015], // Default [2000, current year]
		averageSections: 20, // Default : 10
		onDragged: function(value) {}, // Triggered When the slider is dragged
		onStopped: function(value) {} // Triggered when the slider stops dragging
	});
});

```


## Themes
#####Default Theme
```html
<div id="slider"></div>
```
<img src="http://i.imgur.com/AhpXPeV.gif" width="100%">
#####Black Theme
```html
<div id="slider" class="theme-black"></div>
```
<img src="http://i.imgur.com/dInXWk5.gif" width="100%">
#####Red Theme
```html
<div id="slider" class="theme-red"></div>
```
<img src="http://i.imgur.com/7L7B8yU.gif" width="100%">

###Feel free to contribute to the project

#FAQ
What the License? [MIT](https://en.wikipedia.org/wiki/MIT_License)

Who's the Developer? [Shivam Lekhi](https://www.google.com/search?q=Shivam+Lekhi)