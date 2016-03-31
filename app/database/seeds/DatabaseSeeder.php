<?php

use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		 // $this->cleanDatabase();

		Eloquent::unguard();

//		 $this->call('RoleTableSeeder');
//
//		 $this->call('PermissionsTableSeeder');
//
//		$this->call('DobTableSeeder');
//
//		$this->call('UserTableSeeder');
//
//		$this->call('PostTypeTableSeeder');
//
//		$this->call('EvezownSectionTableSeeder');
//
//		$this->call('CategoryTableSeeder');
//
//		$this->call('SubCategoryTableSeeder');
//
//		$this->call('VisibilityTableSeeder');

        $this->call('EvezplaceProductsTableSeeder');

        $this->call('EvezplaceProductSubcategoriesTableSeeder');

        $this->call('ServicesCategoriesTableSeeder');

        $this->call('ServiceSubCategoriesTableSeeder');

        $this->call('EvezplaceListingTableSeeder');

        $this->call('EvezplaceListingSubcategoriesTableSeeder');

        $this->call('ListingTypeTableSeeder');

        $this->call('ProductPlusServiceTableSeeder');

        $this->call('ProductPlusServiceSubTableSeeder');

        $this->call('StoreSubscriptionTypeTableSeeder');

        $this->call('ReccoSubscriptionsTableSeeder');
	}

}