<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrdersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('orders', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('transaction_id', 15);
			$table->integer('buyer_id')->unsigned()->index();
			$table->foreign('buyer_id')->references('id')->on('buyers');
			$table->integer('store_id')->unsigned()->index();
			$table->foreign('store_id')->references('id')->on('stores');
			$table->integer('current_status_id')->unsigned()->index();
			$table->foreign('current_status_id')->references('id')->on('order_status_enum');
			$table->float('total_amount', 8, 2);
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
		Schema::drop('orders');
	}

}
