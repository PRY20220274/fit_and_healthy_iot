const router = require("express").Router({mergeParams: true});
const  { getUrl, getAccess, refreshAccess, getFit } = require("../controllers/fit");

router.get('/url', getUrl);
router.post('/access', getAccess);
router.post('/refresh', refreshAccess);
router.post('/fit', getFit);


module.exports = {
    router,
}
