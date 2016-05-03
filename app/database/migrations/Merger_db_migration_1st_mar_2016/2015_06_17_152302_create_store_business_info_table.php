<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStoreBusinessInfoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('store_business_info', function(Blueprint $table)
		{
			$table->increments('id');
            $table->integer('store_id')->unsigned()->index();
            $table->foreign('store_id')->references('id')->on('stores');
            $table->string('pan_number', 50)->nullable();
            $table->string('tin_number', 50)->nullable();
            $table->string('vat_number', 50)->nullable();
            $table->string('tan_number', 50)->nullable();
            $table->string('service_tax_id', 50)->nullable();
            $table->string('store_contract_file', 200);
            $table->string('billing_info_name', 50);
            $table->string('billing_info_address', 200);
            $table->string('billing_info_contact_number', 200);
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
		Schema::drop('store_business_info');
	}

}
