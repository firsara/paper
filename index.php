<?php Fibb_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); ?>

<?php if ( have_posts() ): ?>
<ol class="posts">
<?php while ( have_posts() ) : the_post(); ?>
<?php $timestamp = strtotime(get_the_date()); ?>
<?php $color = esc_attr( get_post_meta( $post->ID, '_fibb_color', true ) ); ?>
	<li>
		<article class="<?php echo $color; ?>">
      <a class="link" href="<?php esc_url( the_permalink() ); ?>" rel="bookmark">
        <header>
          <span class="overlay"></span>
          <div class="container-fluid">
            <div class="row">
              <time class="span3" datetime="<?php the_time( 'Y-m-d' ); ?>">
                <?php /*
                <?php the_date(); ?> <?php the_time(); ?>
                */ ?>
                <span class="day"><?php echo date('d', $timestamp); ?></span>
                <span class="month"><?php echo strftime("%B", $timestamp); ?></span>
              </time>
        			<h1 class="title uppercase span5" data-span-wide="5" data-span-desktop="5" data-span-tablet="6" data-span-mobile="12"><?php the_title(); ?></h1>
              <div class="status hidden-phone span4" data-span-wide="4" data-span-desktop="4" data-span-tablet="3" data-span-mobile="12">
                <div class="closed">
                  <span class="title uppercase">open</span>
                  <i class="icon icon-list-open-<?php echo ($color === 'grey' ? 'white' : 'black'); ?>"></i>
                </div>
                <div class="opened">
                  <span class="title uppercase">close</span>
                  <i class="icon icon-list-close-<?php echo ($color === 'grey' ? 'white' : 'black'); ?>"></i>
                </div>
              </div>
            </div>
          </div>
        </header>
      </a>

      <?php
      global $withcomments;
      $withcomments = 1;
      ?>
      <?php Fibb_Utilities::get_template_parts( array( 'parts/shared/article-content' ) ); ?>

		</article>
	</li>
<?php endwhile; ?>
</ol>
<?php else: ?>
<h2>No posts to display</h2>
<?php endif; ?>

<?php Fibb_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>