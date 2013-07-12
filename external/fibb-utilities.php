<?php
	 
	 class Fibb_Utilities {

    	public static function print_a( $a ) {
    		print( '<pre>' );
    		print_r( $a );
    		print( '</pre>' );
    	}

    	public static function get_template_parts( $parts = array() ) {
    		foreach( $parts as $part ) {
    			get_template_part( $part );
    		};
    	}

    	public static function get_page_id_from_path( $path ) {
    		$page = get_page_by_path( $path );
    		if( $page ) {
    			return $page->ID;
    		} else {
    			return null;
    		};
    	}

    	public static function add_slug_to_body_class( $classes ) {
    		global $post;
	   
    		if( is_page() ) {
    			$classes[] = sanitize_html_class( $post->post_name );
    		} elseif(is_singular()) {
    			$classes[] = sanitize_html_class( $post->post_name );
    		};

    		return $classes;
    	}
	
    	public static function get_category_id( $cat_name ){
    		$term = get_term_by( 'name', $cat_name, 'category' );
    		return $term->term_id;
    	}
	
    }
