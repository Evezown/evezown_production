<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('counts', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('comments_count');
			$table->integer('grades_count');
			$table->integer('rewoice_count');
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
		Schema::table('counts', function(Blueprint $table)
		{
			Schema::dropIfExists('counts');
		});
	}

}
