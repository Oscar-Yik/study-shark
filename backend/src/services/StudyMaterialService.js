// achievementLevelService.js
const db = require('../configs/db');

class StudyMaterialService {
  // performs SQL query to get study materials.

  // gets all filtered and sorted study materials from a given topic 
  async getFilteredSortedStudyMaterial(topicId, type, sort) {

    // function to check if topic does not exist
    const checkTopicDoesNotExist = (topicId) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT id FROM createstopic WHERE id = ?'; 
          db.query(exists, [topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows.length == 0);
          });
      });
    };

    // function to check if topic does not exist
    const getQuizzes = (topicId, sort) => {
      return new Promise((resolve, reject) => {
          var exists;
          if (sort == 'lastOpened') {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm, OwnsQuizQuestion oqq WHERE oqq.studyMatTitle = csm.title AND oqq.topicId = csm.topicId AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY lastOpened ASC";
          } else {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm, OwnsQuizQuestion oqq WHERE oqq.studyMatTitle = csm.title AND oqq.topicId = csm.topicId AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY title ASC"; 
          }
          db.query(exists, [topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows);
          });
      });
    };

    // function to check if topic does not exist
    const getFlashcards = (topicId, sort) => {
      return new Promise((resolve, reject) => {
          var exists;
          if (sort == 'lastOpened') {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm, OwnsCard oc WHERE oc.studyMatTitle = csm.title AND oc.topicId = csm.topicId AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY lastOpened ASC";
          } else {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm, OwnsCard oc WHERE oc.studyMatTitle = csm.title AND oc.topicId = csm.topicId AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY title ASC"; 
          }
          db.query(exists, [topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows);
          });
      });
    };

    // function to check if topic does not exist
    const getNotes = (topicId, sort) => {
      return new Promise((resolve, reject) => {
          var exists;
          if (sort == 'lastOpened') {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, csm.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm WHERE  csm.type = 'Notes' AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened, csm.parsedText ORDER BY lastOpened ASC";
          } else {
            exists = "SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, csm.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm WHERE  csm.type = 'Notes' AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened, csm.parsedText ORDER BY title ASC";
          }
          db.query(exists, [topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows);
          });
      });
    };

    // function to check if topic does not exist
    const getAllStudyMaterial = (topicId, sort) => {
      return new Promise((resolve, reject) => {
          var exists;
          if (sort == 'lastOpened') {
            exists = "SELECT csm1.title, csm1.type, DATE_FORMAT(csm1.lastOpened, '%M %d, %Y') AS lastOpened, csm1.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm1, OwnsQuizQuestion oqq WHERE oqq.studyMatTitle = csm1.title AND oqq.topicId = csm1.topicId AND csm1.topicId = ? GROUP BY csm1.title, csm1.type, lastOpened, csm1.parsedText UNION SELECT csm2.title, csm2.type, DATE_FORMAT(csm2.lastOpened, '%M %d, %Y') AS lastOpened, csm2.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm2, OwnsCard oc WHERE oc.studyMatTitle = csm2.title AND oc.topicId = csm2.topicId AND csm2.topicId = ? GROUP BY csm2.title, csm2.type, lastOpened, csm2.parsedText UNION SELECT csm3.title, csm3.type, DATE_FORMAT(csm3.lastOpened, '%M %d, %Y') AS lastOpened, csm3.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm3 WHERE  csm3.type = 'Notes' AND csm3.topicId = ? GROUP BY csm3.title, csm3.type, lastOpened, csm3.parsedText ORDER BY lastOpened ASC";
          } else {
            exists = "SELECT csm1.title, csm1.type, DATE_FORMAT(csm1.lastOpened, '%M %d, %Y') AS lastOpened, csm1.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm1, OwnsQuizQuestion oqq WHERE oqq.studyMatTitle = csm1.title AND oqq.topicId = csm1.topicId AND csm1.topicId = ? GROUP BY csm1.title, csm1.type, lastOpened, csm1.parsedText UNION SELECT csm2.title, csm2.type, DATE_FORMAT(csm2.lastOpened, '%M %d, %Y') AS lastOpened, csm2.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm2, OwnsCard oc WHERE oc.studyMatTitle = csm2.title AND oc.topicId = csm2.topicId AND csm2.topicId = ? GROUP BY csm2.title, csm2.type, lastOpened, csm2.parsedText UNION SELECT csm3.title, csm3.type, DATE_FORMAT(csm3.lastOpened, '%M %d, %Y') AS lastOpened, csm3.parsedText, COUNT(*) as numComponents FROM ContainsStudyMaterial csm3 WHERE  csm3.type = 'Notes' AND csm3.topicId = ? GROUP BY csm3.title, csm3.type, lastOpened, csm3.parsedText ORDER BY title ASC"; 
          }
          db.query(exists, [topicId, topicId, topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows);
          });
      });
    };

    try {
      // if topic does not exist return error "Error topic does not exist"
      if (await checkTopicDoesNotExist(topicId)) {
        const err = new Error("Error topic does not exist");
        throw err;
      }
      // return study material depending on the type
      const quiz = await getQuizzes(topicId, sort); 
      const flashcards = await getFlashcards(topicId, sort);
      const notes = await getNotes(topicId, sort);
      if (type == 'None') {
        return getAllStudyMaterial(topicId, sort);
      } else if (type == 'Quiz') {
        return quiz; 
      } else if (type == 'Flashcards' ) {
        return flashcards;
      } else {
        return notes; 
      }
    } catch (error) {
      throw error;
    }
  }

  // deletes given study material from topic
  async deleteStudyMaterial(topicId, title, username) {
    // function to check if user does not have a topic
    const checkUserDoesNotHaveTopic = (username, topicId) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT id FROM createstopic WHERE username = ? AND id = ?'; 
          db.query(exists, [username, topicId], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows.length == 0);
          });
      });
    };

    // function to check if topic does not have a study material
    const checkTopicDoesNotHaveStudyMaterial = (title, topicId) => {
      return new Promise((resolve, reject) => {
          const exists = 'SELECT title FROM containsStudyMaterial WHERE topicId = ? AND title = ?'; 
          db.query(exists, [topicId, title], (err, rows, fields) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(rows.length == 0);
          });
      });
    };

    try {
      // if user is not authenticated return error "No username"
      if (username == 'no user') {
        const err = new Error("No username");
        throw err;
      } else if (!topicId) {
        // if no topicId is given return error "No topicId"
        const err = new Error("No topicId");
        throw err; 
      } else {
        // if user does not own the topic return error "User does not own topic"
        if (await checkUserDoesNotHaveTopic(username, topicId)) {
          const err = new Error("User does not own topic");
          throw err;
        }
        // if topic does not have the study material return error "Topic does not have study material"
        if (await checkTopicDoesNotHaveStudyMaterial(title, topicId)) {
          const err = new Error("Topic does not have study material");
          throw err;
        }
        // delete study material from topic if there are no errors
        return new Promise ((resolve, reject) => {
          db.query('DELETE FROM containsstudymaterial WHERE topicId = ? AND title = ?', [topicId, title], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
          });
        })
      }
    } catch (error) {
      throw error; 
    } 
  }
}

module.exports = new StudyMaterialService();