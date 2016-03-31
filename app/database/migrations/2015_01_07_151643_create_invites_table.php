<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvitesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('invites', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('dob_id')->unsigned()->index();
			$table->foreign('dob_id')->references('id')->on('dob')->onDelete('cascade');
			$table->string('code');
			$table->string('name', 50);
			$table->string('surname', 30);
			$table->string('email');
			$table->string('referrer_name');
			$table->string('referrer_email');
			$table->boolean('is_evezown_member');
			$table->string('facebook_link', 50)->nullable();
			$table->string('linkedin_link', 50)->nullable();
			$table->string('profession', 30);
			$table->string('how_hear_evezown', 30);
			$table->timestamp('claimed_at')->nullable();
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
		Schema::drop('invites');
	}

}
