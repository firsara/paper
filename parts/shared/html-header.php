<!DOCTYPE HTML>
<!--[if IEMobile 7 ]><html class="no-js iem7" manifest="default.appcache?v=1"><![endif]--> 
<!--[if lt IE 7 ]><html class="no-js ie6" lang="en"><![endif]--> 
<!--[if IE 7 ]><html class="no-js ie7" lang="en"><![endif]--> 
<!--[if IE 8 ]><html class="no-js ie8" lang="en"><![endif]--> 
<!--[if (gte IE 9)|(gt IEMobile 7)|!(IEMobile)|!(IE)]><!--><html class="no-js" lang="en"><!--<![endif]-->
  <head>
    <title><?php wp_title( '|' ); ?></title>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <?php wp_head(); ?>

    <link rel="icon" href="http://madebyfibb.com/assets/icons/favicon-32.png" type="image/x-icon">
    <link rel="shortcut icon" href="http://madebyfibb.com/assets/icons/favicon-32.png" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="57x57" href="http://madebyfibb.com/assets/icons/touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="http://madebyfibb.com/assets/icons/touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="http://madebyfibb.com/assets/icons/touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="http://madebyfibb.com/assets/icons/touch-icon-144.png" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta property="og:image" content="http://madebyfibb.com/assets/icons/og.png">

  <?php if (! is_user_logged_in()): ?>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-40733628-2', 'madebyfibb.com');
    ga('send', 'pageview');
  </script>
  <?php endif; ?>

  </head>
  <body <?php body_class(); ?>>
