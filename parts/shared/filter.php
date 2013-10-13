<?php
$current_categories = array();

$current_category_title = single_cat_title('', false);

if (strlen($current_category_title) > 0)
{
  $current_category = get_category( get_cat_id( single_cat_title("",false) ) );
  $current_categories[] = $current_category;

  $is_filtered = true;

  if (count($current_categories) === 1 && strtolower($current_categories[0]->name) === 'uncategorized')
  {
    $is_filtered = false;
  }
}
?>

<section class="filter<?php echo ($is_filtered ? ' filtered' : ''); ?>">
  <div class="container-fluid">
    <div class="row">
      <div class="span3" data-span-mobile="12">
        <div class="label uppercase">Filter by:</div>
      </div>
      <ul class="span9 filter-list" data-span-mobile="12">
        <div class="row">
          <div class="span3 filter-item-wrapper" data-span-wide="3" data-span-desktop="3" data-span-tablet="4" data-span-mobile="12">
            <a data-key="" class="filter-item uppercase" href="<?php echo home_url(); ?>">
              Show all
            </a>
          </div>
          <?php $categories = get_categories( $args ); ?>
          <?php foreach ($categories as $key => $category): ?>
            <?php if (strtolower($category->name) === 'uncategorized') continue; ?>
            <div class="span3 filter-item-wrapper" data-span-wide="3" data-span-desktop="4" data-span-tablet="6" data-span-mobile="12">
              <?php
              $category_key = strtolower($category->cat_ID.'_'.str_replace(' ', '', $category->name));
              $category_url = get_category_link($category->cat_ID);

              $is_current = false;

              $classes = 'filter-item uppercase';

              foreach ($current_categories as $current_category)
              {
                if ($category->cat_ID === $current_category->cat_ID)
                {
                  $is_current = true;
                  $classes .= ' current';
                }
              }
              ?>
              <a data-key="<?php echo $category_key; ?>" class="<?php echo $classes; ?>" href="<?php echo $category_url; ?>">
                <?php echo $category->name; ?>
              </a>
            </div>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
  </div>
</section>