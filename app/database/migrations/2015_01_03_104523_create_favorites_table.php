<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFavoritesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('favorites', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('title', 30);
			$table->string('description', 100);
			$table->string('small_image_url', 100);
			$table->string('medium_image_url', 100);
			$table->string('large_image_url', 100);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('favorites', function(Blueprint $table)
		{
			Schema::dropIfExists('favorites');
		});
	}

}
