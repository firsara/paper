<?php Fibb_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); ?>

<?php Fibb_Utilities::get_template_parts( array( 'parts/shared/filter' ) ); ?>

<?php if ( have_posts() ): ?>

  <?php Fibb_Utilities::get_template_parts( array( 'parts/shared/loop-articles' ) ); ?>

<?php else: ?>

  <h2>No posts to display</h2>

<?php endif; ?>

<?php Fibb_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>