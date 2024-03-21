const { Router } = require('express');
const studyMaterialController = require('../controllers/StudyMaterialController');

const router = Router();

// TAGS ------------------------------------
// gets all the tags of all the topics belonging to the current user
// this.get("/tag", (schema) => {
// return schema.tags.all();
// }); 

// returns a list of all achievement levels
// router.get('/:id/studymaterial', studyMaterialController.getFilteredSortedStudyMaterial);

// router.post('/', achievementLevelController.postAchievementLevel);

// the rest of your routes should look similar, for example:
// router.put('/:id', achievementLevelController.updateAchievementById);
// here id can be accesed by req.params.id in achievementLevelController

module.exports = router;