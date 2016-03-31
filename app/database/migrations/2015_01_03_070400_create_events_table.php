<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('events', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('owner_id')->unsigned();
			$table->foreign('owner_id')->references('id')->on('user_profile');
			$table->string('title');
			$table->string('description');
			$table->date('start_date');
			$table->date('end_date');
			$table->time('start_time');
			$table->time('end_time');
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
		Schema::table('events', function(Blueprint $table)
		{
			Schema::dropIfExists('events');
		});
	}

}
