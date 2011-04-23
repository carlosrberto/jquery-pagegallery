================================================================
jQuery Pagegallery - A highly customizable jQuery image gallery
================================================================

The **pagegallery** plugin is a highly customizable image gallery created by the Web Developer Carlos Roberto with the jQuery Javascript library.


With a few CSS lines you can easy customize it. All you need is a list of links, an array or a json list.

100% cross-browser, works on all modern browsers (including IE6).

Usage
------

Add the **latest version** of jQuery **pagegallery** js and css files in the head section, a container for the large image, and a list of images in your markup as below.

HTML
----

::

    <div id="gallery_image"></div>

    <ul id="pagegallery_thumbs">
        <li><a href="image_01.jpg" title="Image 01"><img src="thumb_01.jpg"></a></li>
        <li><a href="image_02.jpg" title="Image 02"><img src="thumb_02.jpg"></a></li>
        <li><a href="image_03.jpg" title="Image 03"><img src="thumb_03.jpg"></a></li>
        <li><a href="image_04.jpg" title="Image 04"><img src="thumb_04.jpg"></a></li>
    </ul>
    

Call the pagegallery plugin on the element you'd like show the large images.


JS
--

::

    <script type="text/javascript">
        $(document).ready(function() {
            $("#gallery_image").pagegallery({ width:640, imagelist:'#pagegallery_thumbs' });
        });        
    </script>
    
Optionally, you can add the controlers for next, prev, play, pause and play-pause.

Options
-------
+---------------------------+-----------------------------+
|Option	Default             | Value                       |
+===========================+=============================+
|opacity                    |0.6                          |
+---------------------------+-----------------------------+
|width	 640                |                             |
+---------------------------+-----------------------------+
|height	 480                |                             |
+---------------------------+-----------------------------+
|preloaderText	            |'Loading...'                 |
+---------------------------+-----------------------------+
|errorMessage               |"Error loading the image!"   |
+---------------------------+-----------------------------+
|preloaderOpacity           |0.6                          |
+---------------------------+-----------------------------+
|preloaderTime              |400                          |
+---------------------------+-----------------------------+
|autoPlay                   |false                        | 
+---------------------------+-----------------------------+
|autoPlayInterval           |2500                         |
+---------------------------+-----------------------------+
|playPauseControl           |'#pagegallery_control'       |
+---------------------------+-----------------------------+
|playControl                |'#pagegallery_play'          |
+---------------------------+-----------------------------+
|pauseControl               |'#pagegallery_pause'         |
+---------------------------+-----------------------------+
|imagelist                  |[{name':01.jpg', title:''}]  |
+---------------------------+-----------------------------+
|thumbList                  | '#pagegalery_thumbs'        |
+---------------------------+-----------------------------+
|firstIndex                 |0                            |
+---------------------------+-----------------------------+
|animationTime              |'medium'                     |
+---------------------------+-----------------------------+
|nextButton                 |'#pagegallery_next'          |
+---------------------------+-----------------------------+
|prevButton                 |'#pagegallery_prev'          |
+---------------------------+-----------------------------+
|nextButtonDisableClass     |'pagegallery_disable'        |
+---------------------------+-----------------------------+
|prevButtonDisableClass     |'pagegallery_disable'        |
+---------------------------+-----------------------------+
|enableImageNextLink        | false                       |
+---------------------------+-----------------------------+