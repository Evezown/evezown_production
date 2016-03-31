/**
 * Created by Viswanathan on 6/18/2015.
 */
evezownApp
    .factory('EvezplaceHomeService', function ($http, PATHS) {

        var EvezplaceHomeService = {};

        EvezplaceHomeService.getCategories = function (section_id) {
            return $http
                .get(PATHS.api_url + 'categories/' + section_id)
                .then(function (res) {
                    return res.data.data;
                });
        };

        EvezplaceHomeService.getSubcategories = function (category_id) {
            return $http
                .get(PATHS.api_url + 'subcategories/' + category_id)
                .then(function (res) {
                    return res.data.data;
                });
        };

        return EvezplaceHomeService;
    });