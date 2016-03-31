<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('images', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('small_image_url', 100);
			$table->string('medium_image_url', 100);
			$table->string('large_image_url', 100);
			$table->string('thumbnail_url', 100);
			$table->string('name', 30);
			$table->string('description', 30);
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
		Schema::table('images', function(Blueprint $table)
		{
			Schema::dropIfExists('images');
		});
	}

}
