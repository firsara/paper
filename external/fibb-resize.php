<?php

define('ROOT', realpath(dirname(__FILE__).'/../../../../').'/');


function resize_image($path = '', $type = '', $retina = false, $quality = 90)
{
  $filename = substr($path, strpos($path, '/wp-content/'));
  if (substr($filename, 0, 1) === '/') $filename = substr($filename, 1);

  $ext = pathinfo($filename, PATHINFO_EXTENSION);

  $size = getimagesize(ROOT.$filename);

  $image_width = round($size[0]);
  $image_height = round($size[1]);

  $ratio = $size[0] / $size[1];
  
  switch ($type)
  {
    case 'wide':
      $width = $image_width;
      $height = $image_height;

      if ($width > 1097)
      {
        $width = 1097;
        $height = $width * $ratio;
      }
    break;
    case 'desktop':
      $width = round($image_width / 4 * 3);
      $height = round($image_height / 4 * 3);

      if ($width > 1097 / 4 * 3)
      {
        $width = round(1097 / 4 * 3);
        $height = $width * $ratio;
      }
    break;
    case 'tablet':
      $width = round($image_width / 4 * 3);
      $height = round($image_height / 4 * 3);

      if ($width > 1097 / 4 * 3)
      {
        $width = round(1097 / 4 * 3);
        $height = $width * $ratio;
      }
    break;
    case 'mobile':
      $width = round($image_width / 4 * 1.5);
      $height = round($image_height / 4 * 1.5);

      if ($width > 1097 / 4 * 1.5)
      {
        $width = round(1097 / 4 * 1.5);
        $height = $width * $ratio;
      }
    break;
  }

  if ($retina == 'true')
  {
    $width = $width * 2;
    $height = $height * 2;
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

    $editor->resize( $width, $height, false );
    $editor->set_quality($quality);
    $editor->save($new_filename_path);
  }

  return $new_filename;
}
