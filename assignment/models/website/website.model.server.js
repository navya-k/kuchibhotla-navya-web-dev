/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {

        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };

    return api;

    function createWebsite(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({"_user" : userId});
    }

    function findWebsiteById(websiteId) {
       return Website.findById(websiteId);
    }

    function updateWebsite(id, website) {
        delete website._id;
        return Website.update({_id : id},{
                $set: website
            });
    }

    function deleteWebsite(websiteId) {
       return Website.remove({_id: websiteId});
    }
};