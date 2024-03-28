const { Router } = require('express');
const topicController = require('../controllers/TopicController');
const studyMaterialController = require('../controllers/StudyMaterialController');

const router = Router();

// returns all the user's topics 
router.get('/', topicController.getUserTopics);

// returns all the user's topics in homepage format 
router.get('/home-page', topicController.getUserTopicsHomepage);

// returns a given topic's general info
router.get('/:id/general-info', topicController.getUserTopicsGeneral);

// returns all tags associated with a topic
router.get('/:id/tags', topicController.getUserTopicsTags);

// returns a list of filtered and sorted study material from the given topicId
router.get('/:id/studymaterial', studyMaterialController.getFilteredSortedStudyMaterial);

// deletes a given study material from the given topic
router.delete('/:id/studymaterial/:title', studyMaterialController.deleteStudyMaterial);

module.exports = router;