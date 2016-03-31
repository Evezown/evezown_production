<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserProfileTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_profile', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned()->index();
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->integer('dob_id')->unsigned()->index();
			$table->foreign('dob_id')->references('id')->on('dob')->onDelete('cascade');
			$table->string('firstname', 30);
			$table->string('lastname', 30);
			$table->string('profession', 50);
			$table->string('company', 50);
			$table->string('street_address', 50);
			$table->string('city', 50);
			$table->string('state', 50);
			$table->string('country', 50);
			$table->string('zip', 50);
			$table->string('email', 50);
			$table->string('website', 50);
			$table->string('facebook_address', 50);
			$table->string('linkedin_address', 50);
			$table->text('about_me');
			$table->boolean('gender');
			$table->boolean('active');
			$table->timestamps();
		});

		Schema::create('user_profile_image', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('image_id')->unsigned()->index();
			$table->foreign('image_id')->references('id')->on('images')->onDelete('cascade');
			$table->integer('user_id')->unsigned()->index();
			$table->foreign('user_id')->references('user_id')->on('user_profile')->onDelete('cascade');
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
		Schema::table('user_profile', function (Blueprint $table) {
			$table->dropForeign('user_profile_user_id_foreign');
			$table->dropForeign('user_profile_dob_id_foreign');
		});

		Schema::table('user_profile_image', function (Blueprint $table) {
			$table->dropForeign('user_profile_image_image_id_foreign');
			$table->dropForeign('user_profile_image_user_id_foreign');
		});

		Schema::dropIfExists('user_profile_image');

		Schema::dropIfExists('user_profile');

	}

}
