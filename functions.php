<?php

	require_once( 'external/fibb-utilities.php' );

	add_action( 'wp_enqueue_scripts', 'fibb_script_enqueuer' );
	add_filter( 'body_class', array( 'Fibb_Utilities', 'add_slug_to_body_class' ) );




	function fibb_script_enqueuer() {
		wp_register_script( 'jq', get_template_directory_uri().'/assets/javascripts/vendor/jquery.min.js', null, null, true );
		wp_register_script( 'plugins', get_template_directory_uri().'/assets/javascripts/plugins.js', null, null, true );
		wp_register_script( 'helper', get_template_directory_uri().'/assets/javascripts/app/helper.js', null, null, true );
		wp_register_script( 'site', get_template_directory_uri().'/assets/javascripts/site.js', null, null, true );
		wp_enqueue_script( 'jq' );
		wp_enqueue_script( 'plugins' );
		wp_enqueue_script( 'helper' );
		wp_enqueue_script( 'site' );

		wp_register_style( 'fonts', 'http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800', '', '', 'screen' );
		wp_register_style( 'icons', get_stylesheet_directory_uri().'/assets/stylesheets/icons.css', '', '', 'screen' );
		wp_register_style( 'screen', get_stylesheet_directory_uri().'/assets/stylesheets/screen.css', '', '', 'screen' );
		wp_enqueue_style( 'fonts' );
		wp_enqueue_style( 'icons' );
		wp_enqueue_style( 'screen' );
	}


	function fibb_comment( $comment, $args, $depth ) {
		$GLOBALS['comment'] = $comment; 
		?>
		<?php if ( $comment->comment_approved == '1' ): ?>	
		<li>
			<div class="arrow arrow-top"></div>
			<div class="arrow arrow-bottom"></div>
			<article id="comment-<?php comment_ID() ?>">
				<div class="comment-text">
					<?php comment_text() ?>
				</div>
				<?php
				//echo get_avatar( $comment );
				?>
				<h4><?php comment_author_link() ?></h4>
				<?php $url = get_comment_author_url(); ?>
				<?php if (strlen($url) > 0): ?>
				<h5> &nbsp; . &nbsp; <a href="<?php echo $url; ?>" target="_blank"><?php echo $url; ?></a></h5>
				<?php endif; ?>
				<time><a href="#comment-<?php comment_ID() ?>"><?php comment_date() ?> at <?php comment_time() ?></a></time>
			</article>
    </li>
		<?php endif;
	}




add_action( 'add_meta_boxes', 'fibb_postcolor_add_custom_box' );

add_action( 'save_post', 'fibb_postcolor_save_postdata' );

function fibb_postcolor_add_custom_box() {
    $screens = array( 'post', 'page' );
    foreach ($screens as $screen) {
        add_meta_box(
            'fibb_postcolor_sectionid',
            __( 'Post options', 'fibb_postcolor_textdomain' ),
            'fibb_postcolor_inner_custom_box',
            $screen
        );
    }
}

function fibb_postcolor_inner_custom_box( $post ) {
  wp_nonce_field( plugin_basename( __FILE__ ), 'fibb_postcolor_noncename' );

  $value = get_post_meta( $post->ID, '_fibb_color', true );
  $current = esc_attr($value);
  echo '<label for="fibb_postcolor_new_field">';
       _e("Color", 'fibb_postcolor_textdomain' );
  echo '</label> ';
  echo '<select id="fibb_postcolor_new_field" name="fibb_postcolor_new_field" value="'.esc_attr($value).'">';
  	echo '<option value=""'.($current === '' ? ' selected="selected"' : '').'>Please choose</option>';
  	echo '<option value="grey"'.($current === 'grey' ? ' selected="selected"' : '').'>Grey</option>';
  	echo '<option value="white"'.($current === 'white' ? ' selected="selected"' : '').'>White</option>';
  	echo '<option value="yellow"'.($current === 'yellow' ? ' selected="selected"' : '').'>Yellow</option>';
  	echo '<option value="green"'.($current === 'green' ? ' selected="selected"' : '').'>Green</option>';
  	echo '<option value="blue"'.($current === 'blue' ? ' selected="selected"' : '').'>Blue</option>';
  echo '</select>';
}

function fibb_postcolor_save_postdata( $post_id ) {
  if ( 'page' == $_POST['post_type'] ) {
    if ( ! current_user_can( 'edit_page', $post_id ) )
        return;
  } else {
    if ( ! current_user_can( 'edit_post', $post_id ) )
        return;
  }

  if ( ! isset( $_POST['fibb_postcolor_noncename'] ) || ! wp_verify_nonce( $_POST['fibb_postcolor_noncename'], plugin_basename( __FILE__ ) ) )
      return;

  $post_ID = $_POST['post_ID'];
  $mydata = sanitize_text_field( $_POST['fibb_postcolor_new_field'] );

  add_post_meta($post_ID, '_fibb_color', $mydata, true) or
    update_post_meta($post_ID, '_fibb_color', $mydata);
}











function fibb_comment_form( $args = array(), $post_id = null ) {
	global $id;

	if ( null === $post_id )
		$post_id = $id;
	else
		$id = $post_id;

	$commenter = wp_get_current_commenter();
	$user = wp_get_current_user();
	$user_identity = $user->exists() ? $user->display_name : '';

	$req = get_option( 'require_name_email' );
	$aria_req = ( $req ? " required='required'" : '' );
	$fields =  array(
		'author' => '<p class="comment-form-author">' . '<label for="author">' . __( 'Name' ) . ( $req ? ' <span class="required_star">*</span>' : '' ) . '</label> ' .
		            '<input id="author" name="author" type="text" placeholder="' . __( 'Name' ) . ( $req ? ' *' : '' ) . '" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30"' . $aria_req . ' /></p>',
		'email'  => '<p class="comment-form-email"><label for="email">' . __( 'Email' ) . ( $req ? ' <span class="required_star">*</span>' : '' ) . '</label> ' .
		            '<input id="email" name="email" type="text" placeholder="' . __( 'Email' ) . ( $req ? ' *' : '' ) . '" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30"' . $aria_req . ' /></p>',
		'url'    => '<p class="comment-form-url"><label for="url">' . __( 'Website' ) . '</label>' .
		            '<input id="url" name="url" type="text" placeholder="' . __( 'Website' ) . '" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" /></p>',
	);

	$allowed_tags_text = sprintf( __( 'You may use these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes: %s' ), ' <code>' . allowed_tags() . '</code>' );
	$allowed_tags_text = _x( 'Comment', 'noun' ).' / '.trim( strip_tags($allowed_tags_text) );
	//$allowed_tags_text = str_replace('tags and attributes: ', 'tags and attributes: \n', $allowed_tags_text);

	$required_text = sprintf( ' ' . __('Required fields are marked %s'), '<span class="required_star">*</span>' );
	$defaults = array(
		'fields'               => apply_filters( 'comment_form_default_fields', $fields ),
		'comment_field'        => '<p class="comment-form-comment"><label for="comment">' . _x( 'Comment', 'noun' ) . '</label><textarea id="comment" name="comment" cols="45" rows="8" required="required" placeholder="'. $allowed_tags_text .'"></textarea></p>',
		'must_log_in'          => '<p class="must-log-in">' . sprintf( __( 'You must be <a href="%s">logged in</a> to post a comment.' ), wp_login_url( apply_filters( 'the_permalink', get_permalink( $post_id ) ) ) ) . '</p>',
		'logged_in_as'         => '<p class="logged-in-as">' . sprintf( __( 'Logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>' ), get_edit_user_link(), $user_identity, wp_logout_url( apply_filters( 'the_permalink', get_permalink( $post_id ) ) ) ) . '</p>',
		'comment_notes_before' => '<p class="comment-notes">' . __( 'Your email address will not be published.' ) . ( $req ? $required_text : '' ) . '</p>',
		'comment_notes_after'  => '<p class="form-allowed-tags">' . sprintf( __( 'You may use these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes: %s' ), ' <code>' . allowed_tags() . '</code>' ) . '</p>',
		'id_form'              => 'commentform',
		'id_submit'            => 'submit',
		'title_reply'          => __( 'Leave a Reply' ),
		'title_reply_to'       => __( 'Leave a Reply to %s' ),
		'cancel_reply_link'    => __( 'Cancel reply' ),
		'label_submit'         => __( 'Post Comment' ),
	);

	$args = wp_parse_args( $args, apply_filters( 'comment_form_defaults', $defaults ) );

	?>
		<?php if ( comments_open( $post_id ) ) : ?>
			<?php do_action( 'comment_form_before' ); ?>
			<div class="respond">
				<h3 class="reply-title"><?php comment_form_title( $args['title_reply'], $args['title_reply_to'] ); ?> <small><?php cancel_comment_reply_link( $args['cancel_reply_link'] ); ?></small></h3>
				<?php if ( get_option( 'comment_registration' ) && !is_user_logged_in() ) : ?>
					<?php echo $args['must_log_in']; ?>
					<?php do_action( 'comment_form_must_log_in_after' ); ?>
				<?php else : ?>
					<form action="<?php echo site_url( '/wp-comments-post.php' ); ?>" method="post" class="<?php echo esc_attr( $args['id_form'] ); ?>">
						<?php do_action( 'comment_form_top' ); ?>
						<?php if ( is_user_logged_in() ) : ?>
							<?php echo apply_filters( 'comment_form_logged_in', $args['logged_in_as'], $commenter, $user_identity ); ?>
							<?php do_action( 'comment_form_logged_in_after', $commenter, $user_identity ); ?>
						<?php else : ?>
							<?php
							do_action( 'comment_form_before_fields' );
							foreach ( (array) $args['fields'] as $name => $field ) {
								echo apply_filters( "comment_form_field_{$name}", $field ) . "\n";
							}
							do_action( 'comment_form_after_fields' );
							?>
						<?php endif; ?>
						<?php echo apply_filters( 'comment_form_field_comment', $args['comment_field'] ); ?>
						<?php echo $args['comment_notes_after']; ?>
						<p class="form-submit">
							<input name="submit" type="submit" class="<?php echo esc_attr( $args['id_submit'] ); ?>" value="<?php echo esc_attr( $args['label_submit'] ); ?>" />
							<?php comment_id_fields( $post_id ); ?>
						</p>
						<?php if (! is_user_logged_in() ) : ?>
							<?php echo $args['comment_notes_before']; ?>
						<?php endif; ?>
						<?php do_action( 'comment_form', $post_id ); ?>
					</form>
				<?php endif; ?>
			</div><!-- #respond -->
			<?php do_action( 'comment_form_after' ); ?>
		<?php else : ?>
			<?php do_action( 'comment_form_comments_closed' ); ?>
		<?php endif; ?>
	<?php
}






define('BLOGINFO_BASE_URL', get_bloginfo('template_url').'/');


function fibb_fetch_responsive_images($content)
{
	preg_match_all("/<img[^>]+\>/i", $content, $results);

	foreach (@$results[0] as $result)
	{
		if (strpos($result, 'wp-content/') !== false)
		{
			$src = substr($result, strpos($result, 'wp-content/'));
			$src = substr($src, 0, strpos($src, '"'));

			$size = getimagesize($src);

			$sources = array();
			$sources['wide'] = array('src' => BLOGINFO_BASE_URL.'resize.php?file='.$src.'&type=wide&quality=75', 'width' => $size[0], 'height' => $size[1]);
			$sources['desktop'] = array('src' => BLOGINFO_BASE_URL.'resize.php?file='.$src.'&type=desktop&quality=75', 'width' => $size[0], 'height' => $size[1]);
			$sources['tablet'] = array('src' => BLOGINFO_BASE_URL.'resize.php?file='.$src.'&type=tablet&quality=75', 'width' => $size[0], 'height' => $size[1]);
			$sources['mobile'] = array('src' => BLOGINFO_BASE_URL.'resize.php?file='.$src.'&type=mobile&quality=75', 'width' => $size[0], 'height' => $size[1]);

			$sources['wide-retina'] = array('src' => BLOGINFO_BASE_URL.'resize.php?file='.$src.'&type=wide&quality=75&retina=true', 'width' => $size[0], 'height' => $size[1]);
			$sources['desktop-retina'] = array('src' => BLOGINFO_BASE_URL.'resize.php?file='.$src.'&type=desktop&quality=75&retina=true', 'width' => $size[0], 'height' => $size[1]);
			$sources['tablet-retina'] = array('src' => BLOGINFO_BASE_URL.'resize.php?file='.$src.'&type=tablet&quality=75&retina=true', 'width' => $size[0], 'height' => $size[1]);
			$sources['mobile-retina'] = array('src' => BLOGINFO_BASE_URL.'resize.php?file='.$src.'&type=mobile&quality=75&retina=true', 'width' => $size[0], 'height' => $size[1]);

			$content = str_replace($result, '<span class="responsive-image"><noscript data-base="'.BLOGINFO_BASE_URL.'" data-src=\''.json_encode($sources).'\'>'.$result.'</noscript></span>', $content);
		}
	}

	return $content;
}