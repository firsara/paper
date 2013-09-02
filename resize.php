<?php
$type = @$_GET['type'];
if ($type == '') die('SPECIFY type');

$file = @$_GET['file'];
if ($file == '') die('SPECIFY file');


$is_retina = @$_GET['retina'] == 'true';


if (isset($_GET['quality']) === false || strlen($_GET['quality']) === 0)
{
  $_GET['quality'] = 75;
}





define('ROOT', realpath(dirname(__FILE__).'/../../../').'/');



function crop_image($path = '', $type = '', $retina = false)
{
  $filename = substr($path, strpos($path, '/wp-content/'));
  if (substr($filename, 0, 1) === '/') $filename = substr($filename, 1);

  $ext = pathinfo($filename, PATHINFO_EXTENSION);

  $size = getimagesize(ROOT.$filename);

  $image_width = round($size[0] / 1.5);
  $image_height = round($size[1] / 1.5);

  $ratio = $size[0] / $size[1];
  
  switch ($type)
  {
    case 'wide':
      $width = $image_width;
      $height = $image_height;
    break;
    case 'desktop':
      $width = round($image_width / 4 * 3);
      $height = round($image_height / 4 * 3);
    break;
    case 'tablet':
      $width = round($image_width / 4 * 2);
      $height = round($image_height / 4 * 2);
    break;
    case 'mobile':
      $width = round($image_width / 4);
      $height = round($image_height / 4);
    break;
  }

  if ($width > 1097)
  {
    $width = 1097;
    $height = $width * $ratio;
  }

  $new_filename = str_replace('uploads/', 'uploads/cache/', str_replace('.'.$ext, '_w'.$width.'_h'.$height.'.'.$ext, $path));

  $new_filename_path = ROOT.str_replace('uploads/', 'uploads/cache/', str_replace('.'.$ext, '_w'.$width.'_h'.$height.'.'.$ext, $filename));

  $recreate = false;

  if (file_exists($new_filename_path) === false || @filemtime($new_filename_path) - time() < -3600)
  {
    $recreate = true;
  }

  if ($recreate)
  {
    $dir = dirname($new_filename_path);
    @mkdir($dir, 0777, true);

    $editor = wp_get_image_editor( ROOT.$path );

    if ($retina == 'true')
    {
      $width = $width * 2;
      $height = $height * 2;
    }

    $editor->resize( $width, $height, false );
    $editor->set_quality($_GET['quality']);
    $editor->save($new_filename_path);
  }

  return $new_filename;
}



if ( !isset($wp_did_header) ) {

  $wp_did_header = true;

  require_once( ROOT . 'wp-load.php' );

}



$source = crop_image($file, $type, $is_retina);

header('Location: '.get_bloginfo('url').'/'.$source);
exit();