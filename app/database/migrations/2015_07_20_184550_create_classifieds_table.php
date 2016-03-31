<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateClassifiedsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('classifieds', function(Blueprint $table)
		{
			$table->increments('id');
            $table->enum('classified_type', array('products', 'services'));
            $table->integer('classified_category_id')->unsigned()->index();
            $table->foreign('classified_category_id')->references('id')->on('categories');
            $table->integer('classified_subcategory_id')->unsigned()->index();
            $table->foreign('classified_subcategory_id')->references('id')->on('sub_categories');
            $table->string('title', 50);
            $table->text('description');
            $table->string('deal_description', 100);
            $table->integer('layout_type');
            $table->integer('classified_for');
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('is_my_eves');
            $table->boolean('is_my_circles');
            $table->boolean('is_only_me');
            $table->boolean('is_recco_it_channel');
            $table->boolean('is_open_to_public');
            $table->boolean('is_add_enquiry');
            $table->boolean('is_facebook_share');
            $table->boolean('is_watsapp_share');
            $table->boolean('is_googleplus_share');
            $table->boolean('is_twitter_share');
            $table->boolean('is_direct_message_share');
            $table->boolean('is_gmail_share');
            $table->boolean('is_linkedin_share');
            $table->boolean('is_email_share');
            $table->boolean('is_views_analytics');
            $table->boolean('is_enquires_analytics');
            $table->boolean('is_sends_analytics');
            $table->boolean('is_gradeit_analytics');
            $table->boolean('is_visibility_summary_analytics');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('classifieds');
	}

}
