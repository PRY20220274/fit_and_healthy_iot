const router = require("express").Router({mergeParams: true});
const  { getFit } = require("../controllers/fit");

router.post('/', getFit);


module.exports = {
    router,
}
