<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderItemShippingAddressesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_item_shipping_addresses', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('order_item_id')->unsigned()->index();
			$table->foreign('order_item_id')->references('id')->on('order_items');
			$table->string('address_line1', 255);
			$table->string('address_line2', 255)->nullable();
			$table->string('address_line3', 255)->nullable();
			$table->string('city', 255);
			$table->string('state', 255);
			$table->string('country', 255);
			$table->string('pincode', 20);
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
		Schema::drop('order_item_shipping_addresses');
	}

}
