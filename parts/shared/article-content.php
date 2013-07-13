  <section class="wrapper">
    <div class="article-content">
      <div class="container-fluid">
        <div class="content row">
          <div class="arrow main-arrow"></div>
          <div class="span8 offset3" data-offset-tablet="0" data-span-tablet="12" data-offset-mobile="0" data-span-mobile="12">
            <div class="text">
              <?php ob_start(); the_content(); $content = ob_get_contents(); ob_clean(); ?>
              <?php echo fibb_fetch_responsive_images($content); ?>
            </div>
            <?php if ( get_the_author_meta( 'description' ) ) : ?>
            <?php echo get_avatar( get_the_author_meta( 'user_email' ) ); ?>
            <h3>About <?php echo get_the_author() ; ?></h3>
            <?php the_author_meta( 'description' ); ?>
            <?php endif; ?>
          </div>
        </div>
      </div>

      <div class="actions-outer">
        <div class="container-fluid">
          <div class="row">
            <div class="span8 offset3" data-offset-tablet="0" data-span-tablet="12" data-offset-mobile="0" data-span-mobile="12">
              <a class="action close uppercase" href="<?php echo bloginfo('url'); ?>"><span class="trigger">close</span></a>
               &nbsp; 
              .
               &nbsp; 
              <span class="share">
                <a class="action uppercase" href="<?php echo bloginfo('url'); ?>">share</a>
                <span class="holder">
                  <span class="arrow"></span>
                  <a target="_blank" href="http://facebook.com/sharer.php?u=<?php the_permalink(); ?>" class="facebook share-element popup">facebook</a>
                  <?php /*
                  <a target="_blank" href="https://twitter.com/share" data-lang="en" class="twitter twitter-share-button share-element popup">twitter</a>
                  */ ?>
                  <a target="_blank" href="https://twitter.com/share?url=<?php the_permalink(); ?>" class="twitter share-element popup">twitter</a>
                </span>
              </span>

              <?php /*
              <div class="action float-right like">
                <div class="fb-like"
                  data-href="<?php the_permalink(); ?>"
                  data-send="false"
                  data-layout="box_count"
                  data-width="450"
                  data-show-faces="false"
                  data-colorscheme="light">
                </div>
              </div>
              */ ?>
  
            </div>
          </div>
        </div>
      </div>


      <?php if (get_comments_number() > 0): ?>
      <div class="commentlist-outer">
        <div class="container-fluid">
          <div class="row">
            <div class="span8 offset3" data-offset-tablet="0" data-span-tablet="12" data-offset-mobile="0" data-span-mobile="12">
              <?php comments_template( '', true ); ?>
              <span class="show-more uppercase">show more</span>
            </div>
          </div>
        </div>
      </div>
      <?php endif; ?>

    </div>

    <div class="comments-outer">
      <div class="container-fluid">
        <div class="row comments-inner">
          <div class="arrow"></div>
          <div class="span8 offset3" data-offset-tablet="0" data-span-tablet="12" data-offset-mobile="0" data-span-mobile="12">
            <?php fibb_comment_form(); ?>
          </div>
        </div>
      </div>
    </div>


<?php /*      
    <div class="actions-outer">
      <div class="container-fluid">
        <div class="row">
          <div class="span8 offset3" data-offset-tablet="0" data-span-tablet="12" data-offset-mobile="0" data-span-mobile="12">
            <a class="action close uppercase" href="<?php echo bloginfo('url'); ?>">close</a>
             &nbsp; 
            .
             &nbsp; 
            <a class="action share uppercase" href="<?php echo bloginfo('url'); ?>">share</a>
          </div>
        </div>
      </div>
    </div>
*/ ?>

  </section>
