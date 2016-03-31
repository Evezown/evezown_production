<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStoresTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('stores', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('owner_id')->unsigned()->index();
			$table->foreign('owner_id')->references('id')->on('user_profile');
			$table->string('title', 30);
			$table->text('description');
			$table->string('web_address');
			$table->string('email_address');
			$table->string('street_address');
			$table->string('city');
			$table->string('state');
			$table->string('country');
			$table->string('zip');
			$table->timestamps();
		});

		Schema::create('products', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('store_id')->unsigned()->index();
			$table->foreign('store_id')->references('id')->on('stores');
			$table->integer('sub_cat_id')->unsigned()->index();
			$table->foreign('sub_cat_id')->references('id')->on('sub_categories');
			$table->string('title', 30);
			$table->text('description');
			$table->string('price');
			$table->timestamps();
		});

		Schema::create('listings', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('store_id')->unsigned()->index();
			$table->foreign('store_id')->references('id')->on('stores');
			$table->integer('sub_cat_id')->unsigned()->index();
			$table->foreign('sub_cat_id')->references('id')->on('sub_categories');
			$table->string('title', 30);
			$table->text('description');
			$table->string('price');
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
		Schema::table('products', function (Blueprint $table) {
			$table->dropForeign('products_store_id_foreign');
		});

		Schema::table('listings', function (Blueprint $table) {
			$table->dropForeign('listings_store_id_foreign');
		});

		Schema::drop('products');
		Schema::drop('listings');
		Schema::drop('stores');
	}

}
