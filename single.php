<?php Fibb_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

<?php $timestamp = strtotime(get_the_date()); ?>
<?php $color = esc_attr( get_post_meta( $post->ID, '_fibb_color', true ) ); ?>

<article class="single <?php echo $color; ?>">
  <header class="_fixed">

    <?php $adjacent = get_next_post(); ?>
    <?php if ($adjacent && $adjacent->ID != get_the_id()): ?>
    <a class="arrow-adjacent-post arrow-prev-post" href="<?php echo get_permalink( $adjacent->ID ); ?>">
      <i class="icon icon-prev<?php echo ($color == 'grey' ? '-white' : ''); ?> centered aligned-left"></i>
    </a>
    <?php endif; ?>

    <?php $adjacent = get_previous_post(); ?>
    <?php if ($adjacent && $adjacent->ID != get_the_id()): ?>
    <a class="arrow-adjacent-post arrow-next-post" href="<?php echo get_permalink( $adjacent->ID ); ?>">
      <i class="icon icon-next<?php echo ($color == 'grey' ? '-white' : ''); ?> centered aligned-right"></i>
    </a>
    <?php endif; ?>

    <div class="container-fluid">
      <div class="row">
        <time class="span3" datetime="<?php the_time( 'Y-m-d' ); ?>" pubdate>
          <?php /*
          <?php the_date(); ?> <?php the_time(); ?>
          */ ?>
          <span class="day"><?php echo date('d', $timestamp); ?></span>
          <span class="month"><?php echo strftime("%B", $timestamp); ?></span>
        </time>
        <h1 class="title uppercase span5" data-span-wide="5" data-span-desktop="5" data-span-tablet="6" data-span-mobile="12"><?php the_title(); ?></h1>
      </div>
    </div>
  </header>

  <?php Fibb_Utilities::get_template_parts( array( 'parts/shared/article-content' ) ); ?>

</article>

<?php endwhile; ?>

<?php Fibb_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer' ) ); ?>