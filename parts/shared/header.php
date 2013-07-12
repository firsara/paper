<header id="header" class="clearfix">
  <div class="container-fluid">
  	<h2 class="float-left logo">
      <a href="<?php echo home_url(); ?>">
        <i class="icon icon-logo"><?php bloginfo( 'name' ); ?></i>
      </a>
    </h2>
    <?php
    $url = home_url();

    if (is_front_page())
    {
      $url = 'http://madebyfibb.com';
    }
    ?>
    <a href="<?php echo $url; ?>" class="float-right close">
      <i class="icon icon-close"></i>
    </a>
  </div>
</header>

<section id="content">
